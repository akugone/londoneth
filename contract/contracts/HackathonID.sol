// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Counters} from "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Hackathon ID Contract
 * @author FiftyWei Team @ ETH Global London
 */
contract HackathonID is ERC721, AccessControl {
    using Counters for Counters.Counter;

    uint8 constant MIN_HANDLE_LENGTH = 5;
    uint8 constant MAX_HANDLE_LENGTH = 31;

    // =========================== Structs ==============================

    struct Hackathon {
        uint256 id;
        string name;
        string cid;
    }

    struct Event {
        uint256 id;
        uint256 hackathonId;
        string name;
        string eventCid;
    }

    struct Charity {
        uint256 id;
        uint256 hackathonId;
        uint256 eventId;
        string name;
        string charityCid;
    }

    /**
     * @notice Taken Hackathon name
     */
    mapping(string => bool) public takenHackathonNames;

    /**
     * @notice Hackathon address to Hackathon struct
     */
    mapping(address => Hackathon) public hackathons;

    // Hackathon ID to Hackathon struct
    mapping(uint256 => Hackathon) public hackathonsById;

    // Create a mapping of event organize by the hackathon
    mapping(uint256 => Event) public events;

    // Create a double mapping of charity link to an event create by the hackathon
    mapping(uint256 => Charity) public charityLink;

    /**
     * @notice Hackathon Id counter
     */
    Counters.Counter private _nextHackathonId;

    /**
     * @notice Charity Id counter
     */
    Counters.Counter private _nextCharityId;

    /**
     * @notice Event Id counter
     */
    Counters.Counter private _nextEventId;

    /**
     * @notice Role granting Minting permission
     */
    bytes32 public constant MINT_ROLE = keccak256("MINT_ROLE");

    // =========================== Errors ==============================

    /**
     * @notice error thrown when input handle is 0 or more than 31 characters long.
     */
    error HandleLengthInvalid();

    /**
     * @notice error thrown when input handle contains restricted characters.
     */
    error HandleContainsInvalidCharacters();

    /**
     * @notice error thrown when input handle has an invalid first character.
     */
    error HandleFirstCharInvalid();

    // =========================== Constructor ==============================

    constructor() ERC721("HackathonID", "HID") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINT_ROLE, msg.sender);

        _nextHackathonId.increment(); // we start the HackathonID at 1
        _nextCharityId.increment(); // we start the CharityID at 1
        _nextEventId.increment(); // we start the EventID at 1
    }

    // =========================== View functions ==============================

    // get hackathon info by address
    function getHackathonbyAddress(address _hackathonAddress) external view returns (Hackathon memory) {
        return hackathons[_hackathonAddress];
    }

    //get hackathon info by hackathon id
    function getHackathonbyId(uint256 _hackathonId) external view returns (Hackathon memory) {
        return hackathonsById[_hackathonId];
    }

    // get event event by eventID
    function getEvent(uint256 _eventId) external view returns (Event memory) {
        return events[_eventId];
    }

    // get charity by hackathon id and event id
    function getCharity(uint256 _charityId) external view returns (Charity memory) {
        return charityLink[_charityId];
    }

    // return the total number of Hackathon ID
    function totalHackathonIdSupply() public view returns (uint256) {
        return _nextHackathonId.current() - 1;
    }

    // return the total number of Charity ID
    function totalCharityIdSupply() public view returns (uint256) {
        return _nextCharityId.current() - 1;
    }

    // =========================== User functions ==============================

    // Create a new event by the hackathon
    function createEvent(
        uint256 _hackathonId,
        string memory _eventName,
        string memory _eventCid
    ) public onlyHackathonOwner(_hackathonId) {
        isValid(_hackathonId);
        uint256 eventId = _nextEventId.current();
        Event storage hackathonEvent = events[eventId];
        hackathonEvent.id = _nextEventId.current();
        hackathonEvent.hackathonId = _hackathonId;
        hackathonEvent.name = _eventName;
        hackathonEvent.eventCid = _eventCid;

        _nextEventId.increment();

        emit EventCreated(_nextEventId.current(), _hackathonId, _eventName, _eventCid);
    }

    // create a new charity by the hackathon linked to an event
    function createCharity(
        uint256 _hackathonId,
        uint256 _eventId,
        string memory _charityName,
        string memory _charityCid
    ) public onlyHackathonOwner(_hackathonId) {
        isValid(_hackathonId);
        uint256 charityId = _nextCharityId.current();
        Charity storage charity = charityLink[charityId];
        charity.id = _nextCharityId.current();
        charity.hackathonId = _hackathonId;
        charity.eventId = _eventId;
        charity.name = _charityName;
        charity.charityCid = _charityCid;

        _nextCharityId.increment();
        emit charityCreated(_nextCharityId.current(), _hackathonId, _eventId, _charityName, _charityCid);
    }

    // update the cid of the hackathon
    function updateCid(uint256 _hackathonId, string memory _newCid) public onlyHackathonOwner(_hackathonId) {
        isValid(_hackathonId);
        hackathons[msg.sender].cid = _newCid;
        emit CidUpdated(_hackathonId, _newCid);
    }

    // =========================== PoG functions ==============================

    /**
     * @notice Mint a new Hackathon ID for Hackathon
     * @dev You need to have MINT_ROLE to use this function
     * @param _hackathonName Hackathon name
     * @param _hackathonAddress Address to assign the Hackathon Id to
     */

    function mintForAddress(
        string calldata _hackathonName,
        address _hackathonAddress
    ) public payable canMint(_hackathonName, _hackathonAddress) onlyRole(MINT_ROLE) returns (uint256) {
        // add the Hackathon to the mapping
        _mint(_hackathonAddress, _nextHackathonId.current());
        return _afterMint(_hackathonName, _hackathonAddress);
    }

    // =========================== Private functions ==============================

    /**
     * @notice Update Platform name mapping and emit event after mint.
     * @param _hackathonName Name of the platform
     */
    function _afterMint(string memory _hackathonName, address _hackathonAddress) private returns (uint256) {
        uint256 hackathonId = _nextHackathonId.current();
        _nextHackathonId.increment();
        Hackathon storage hackathon = hackathonsById[hackathonId];
        hackathon.name = _hackathonName;
        hackathon.id = hackathonId;
        takenHackathonNames[_hackathonName] = true;
        hackathons[_hackathonAddress] = hackathon;

        emit HackathonIdMinted(_hackathonAddress, hackathonId, _hackathonName);

        return hackathonId;
    }

    /**
     * @notice Validate characters used in the handle, only alphanumeric, only lowercase characters, - and _ are allowed but as first one
     * @param handle Handle to validate
     */
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

    // =========================== External functions ==============================

    /**
     * @notice Check whether the Hackathon Id is valid.
     * @param _hackathonId Hackathon ID to validate
     */
    function isValid(uint256 _hackathonId) public view {
        require(_hackathonId > 0 && _hackathonId < _nextHackathonId.current(), "Invalid platform ID");
    }

    // =========================== Overrides ==============================

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return ERC721.supportsInterface(interfaceId) || AccessControl.supportsInterface(interfaceId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721) {
        revert("Not allowed");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override(ERC721) {
        revert("Not allowed");
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721) returns (string memory) {
        return _buildTokenURI(tokenId);
    }

    /**
     * @notice Builds the token URI
     * @param id The ID of the token
     */
    function _buildTokenURI(uint256 id) internal view returns (string memory) {
        string memory hackathonName = string.concat(hackathonsById[id].name, ".fund");
        string memory fontSizeStr = bytes(hackathonsById[id].name).length <= 20 ? "60" : "40";

        bytes memory image = abi.encodePacked(
            "data:image/svg+xml;base64,",
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="720"><rect width="100%" height="100%"/><svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" version="1.2" viewBox="-200 -50 1000 1000"><path fill="#FFFFFF" d="M264.5 190.5c0-13.8 11.2-25 25-25H568c13.8 0 25 11.2 25 25v490c0 13.8-11.2 25-25 25H289.5c-13.8 0-25-11.2-25-25z"/><path fill="#FFFFFF" d="M265 624c0-13.8 11.2-25 25-25h543c13.8 0 25 11.2 25 25v56.5c0 13.8-11.2 25-25 25H290c-13.8 0-25-11.2-25-25z"/><path fill="#FFFFFF" d="M0 190.5c0-13.8 11.2-25 25-25h543c13.8 0 25 11.2 25 25V247c0 13.8-11.2 25-25 25H25c-13.8 0-25-11.2-25-25z"/></svg><text x="30" y="670" style="font: ',
                        fontSizeStr,
                        'px sans-serif;fill:#fff">',
                        hackathonName,
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
                                hackathonName,
                                '", "image":"',
                                image,
                                unicode'", "description": "Hackathon ID"}'
                            )
                        )
                    )
                )
            );
    }

    // =========================== Modifiers ==============================

    modifier onlyHackathonOwner(uint256 _hackathonId) {
        require(ownerOf(_hackathonId) == msg.sender, "Not the owner");
        _;
    }

    /**
     * @notice Check if Platform is able to mint a new Platform ID.
     * @param _hackathonName name of the hackathon associated with the ID
     * @param _hackathonAddress address of the hackathon associated with the ID
     */
    modifier canMint(string calldata _hackathonName, address _hackathonAddress) {
        require(balanceOf(_hackathonAddress) == 0, "Hackathon already has a Hackathon ID");
        require(!takenHackathonNames[_hackathonName], "Name already taken");

        _validateHandle(_hackathonName);
        _;
    }

    // =========================== Events ==============================

    /**
     * @notice Emit when a new event is created.
     * @param _eventId The ID of the event
     * @param _hackathonId The ID of the Hackathon
     * @param _eventName Name of the event
     * @param _eventCid IPFS CID of the event
     */
    event EventCreated(uint256 _eventId, uint256 _hackathonId, string _eventName, string _eventCid);

    /**
     * Emit when Cid is updated for a platform.
     * @param _tokenId Platform ID concerned
     * @param _newCid New URI
     */
    event CidUpdated(uint256 indexed _tokenId, string _newCid);

    /**
     * @notice Emit when new Platform ID is minted.
     * @param _hackathonAddress Address of the owner of the PlatformID
     * @param hackathonId The Platform ID
     * @param _hackathonName Name of the platform
     */
    event HackathonIdMinted(address indexed _hackathonAddress, uint256 hackathonId, string _hackathonName);

    /**
     * @notice Emit when new Charity ID is created.
     * @param charityId The Charity
     * @param hackathonId The Hackathon
     * @param _charityName Name of the charity
     * @param _charityCid IPFS CID of the charity
     */
    event charityCreated(
        uint256 charityId,
        uint256 hackathonId,
        uint256 eventId,
        string _charityName,
        string _charityCid
    );
}
