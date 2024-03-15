// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IHackathonID} from "./interfaces/IHackathonID.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IHackathonID} from "./interfaces/IHackathonID.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title PoG Contract
 * @author FiftyWei Team @ ETHGlobal London
 */
contract ProofOfGive is ERC721, Ownable {
    using Counters for Counters.Counter;

    // =========================== Structs ==============================

    /// @notice Unified Donation Struct
    /// @param donationId the id of the donation
    /// @param handle the handle of the donor
    /// @param charityId the id of the charity
    /// @param hackathonId the hackathon Id linked to the donation
    /// @param dataUri the IPFS URI of the donation metadata if any
    struct Donation {
        uint256 donationId;
        string handle;
        uint256 hackathonId;
        uint256 eventId; // Event donation
        uint256 charityId;
        string dataUri; // Clothes and type donation
    }

    // =========================== Mappings & Variable ==============================

    /**
     * @notice platform id for the protocol
     */
    uint8 constant PROTOCOL_ID = 0;

    // Mapping from tokenId to Donation data
    mapping(uint256 => Donation) public donations;

    // mapping from user address to tokenId
    mapping(address => uint256) public ids;

    mapping(string => bool) public takenHandles;

    /**
     * @notice Donation Id counter for all types of donations
     */
    Counters.Counter private donationIdCounter;

    IHackathonID public hackathonID;

    /**
     * @notice min and max length for a handle
     */
    uint8 constant MIN_HANDLE_LENGTH = 1;
    uint8 constant MAX_HANDLE_LENGTH = 31;

    constructor(address _hackathonIdAddress) ERC721("Proof Of Donation", "PoG") {
        hackathonID = IHackathonID(_hackathonIdAddress);
        donationIdCounter.increment();
    }

    // =========================== Error ==============================
    error HandleContainsInvalidCharacters();

    error HandleLengthInvalid();

    error HandleFirstCharInvalid();

    // =========================== View functions ==============================

    /**
     * Allows retrieval of number of minted GiversID for a user.
     * @param _user Address of the owner of the GiverID
     * @return the number of tokens minted by the user
     */
    function numberMinted(address _user) public view returns (uint256) {
        return balanceOf(_user);
    }

    // =========================== Modifier ==============================

    modifier canMint(
        address _userAddress,
        string calldata _handle,
        uint256 _hackathonId
    ) {
        require(!takenHandles[_handle], "Handle already taken");
        hackathonID.isValid(_hackathonId);
        _validateHandle(_handle);
        _;
    }

    // =========================== User functions ==============================

    function mintPoG(
        address _userAddress,
        uint256 _hackathonId,
        uint256 _eventId,
        uint256 _charityId,
        string calldata _handle,
        string calldata _dataUri
    ) external payable canMint(_userAddress, _handle, _hackathonId) returns (uint256) {
        _mint(_userAddress, donationIdCounter.current());
        return _afterMint(_userAddress, _hackathonId, _eventId, _charityId, _handle, _dataUri);
    }

    // =========================== Private functions ==============================

    function _afterMint(
        address _userAddress,
        uint256 _hackathonId,
        uint256 _eventId,
        uint256 _charityId,
        string calldata _handle,
        string calldata _dataUri
    ) private returns (uint256) {
        uint256 userDonationId = donationIdCounter.current();
        donationIdCounter.increment();
        Donation storage donation = donations[userDonationId];
        donation.donationId = userDonationId;
        donation.handle = _handle;
        donation.charityId = _charityId;
        donation.hackathonId = _hackathonId;
        donation.dataUri = _dataUri;
        donation.eventId = _eventId;
        ids[_userAddress] = userDonationId;

        emit pogMinted(userDonationId, _userAddress, _hackathonId, _eventId, _charityId, _handle, _dataUri);

        return userDonationId;
    }

    function _validateHandle(string calldata handle) private pure {
        bytes memory byteHandle = bytes(handle);
        uint256 byteHandleLength = byteHandle.length;
        if (byteHandleLength < MIN_HANDLE_LENGTH || byteHandleLength > MAX_HANDLE_LENGTH) revert HandleLengthInvalid();

        bytes1 firstByte = bytes(handle)[0];
        if (firstByte == "-" || firstByte == "_") revert HandleFirstCharInvalid();

        for (uint256 i = 0; i < byteHandleLength; ) {
            if (
                (byteHandle[i] < "0" || byteHandle[i] > "z" || (byteHandle[i] > "9" && byteHandle[i] < "a")) &&
                byteHandle[i] != "-" &&
                byteHandle[i] != "_"
            ) revert HandleContainsInvalidCharacters();
            ++i;
        }
    }

    // =========================== Overrides ==============================

    function transferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721) {}

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721) {}

    function tokenURI(uint256 tokenId) public view virtual override(ERC721) returns (string memory) {
        return _buildTokenURI(tokenId);
    }

    function _buildTokenURI(uint256 id) internal view returns (string memory) {
        string memory username = string.concat(donations[id].handle, ".tl");
        string memory fontSizeStr = bytes(donations[id].handle).length <= 20 ? "60" : "40";

        bytes memory image = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720"><rect width="100%" height="100%"/><svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" version="1.2" viewBox="-200 -50 1000 1000"><path fill="#FFFFFF" d="M264.5 190.5c0-13.8 11.2-25 25-25H568c13.8 0 25 11.2 25 25v490c0 13.8-11.2 25-25 25H289.5c-13.8 0-25-11.2-25-25z"/><path fill="#FFFFFF" d="M265 624c0-13.8 11.2-25 25-25h543c13.8 0 25 11.2 25 25v56.5c0 13.8-11.2 25-25 25H290c-13.8 0-25-11.2-25-25z"/><path fill="#FFFFFF" d="M0 190.5c0-13.8 11.2-25 25-25h543c13.8 0 25 11.2 25 25V247c0 13.8-11.2 25-25 25H25c-13.8 0-25-11.2-25-25z"/></svg><text x="30" y="670" style="font: ',
                        fontSizeStr,
                        'px sans-serif;fill:#fff">',
                        username,
                        "</text></svg>"
                    )
                )
            )
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                username,
                                '", "image":"',
                                image,
                                unicode'", "description": "TalentLayer ID"}'
                            )
                        )
                    )
                )
            );
    }

    // =========================== Events ==============================

    event pogMinted(
        uint256 indexed donationId,
        address indexed userAddress,
        uint256 indexed hackathonId,
        uint256 eventId,
        uint256 charityId,
        string handle,
        string dataUri
    );
}
