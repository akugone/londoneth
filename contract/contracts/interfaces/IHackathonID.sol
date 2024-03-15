// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IHackathonID {

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

     function getHackathonbyAddress(address _hackathonAddress) external view returns (uint256 id, string memory name, string memory cid);
    function getHackathonbyId(uint256 _hackathonId) external view returns (uint256 id, string memory name, string memory cid);
    function getEvent(uint256 _hackathonId) external view returns (uint256 id, uint256 hackathonId, string memory name, string memory eventCid);
    function getCharity(uint256 _hackathonId, uint256 _eventId) external view returns (uint256 id, uint256 hackathonId, uint256 eventId, string memory name, string memory charityCid);
    function totalHackathonIdSupply() external view returns (uint256);
    function totalCharityIdSupply() external view returns (uint256);

    function takenHackathonNames(string calldata) external view returns (bool);

    function hackathons(uint256) external view returns (Hackathon memory);

    function ids(address) external view returns (uint256);

    function getHackathon(uint256 _hackathonId) external view returns (Hackathon memory);

    function totalSupply() external view returns (uint256);

    function updateProfileData(uint256 _hackathonId, string memory _newCid) external;

    function mintForAddress(string calldata _hackathonName, address _hackathonAddress) external payable returns (uint256);

    function isValid(uint256 _hackathonId) external view;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function transferFrom(address from, address to, uint256 tokenId) external;

    function safeTransferFrom(address from, address to, uint256 tokenId) external;

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function ownerOf(uint256 tokenId) external view returns (address);
}
