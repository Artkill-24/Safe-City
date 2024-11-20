// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SafeCityToken is ERC20, Ownable {
    struct UserProfile {
        uint256 reputation;
        uint256 totalReports;
        bool isValidator;
    }

    mapping(address => UserProfile) public userProfiles;
    uint256 public constant INITIAL_SUPPLY = 100000000;

    constructor() ERC20("Safe City Token", "SCIT") {
        _transferOwnership(msg.sender);
        _mint(msg.sender, INITIAL_SUPPLY * 10**decimals());
    }

    function mintReward(address _user, uint256 _amount) public onlyOwner {
        _mint(_user, _amount);
    }

    function updateReputation(address _user, uint256 _points) public onlyOwner {
        userProfiles[_user].reputation = _points;
    }

    function getUserProfile(address _user) public view returns (UserProfile memory) {
        return userProfiles[_user];
    }
}
