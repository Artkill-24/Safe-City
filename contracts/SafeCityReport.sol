// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SafeCityReporting {
    struct Report {
        uint256 id;
        address reporter;
        string description;
        string category;
        uint256 timestamp;
        string status;
        uint256 upvotes;
        bool isResolved;
        uint256[] location;
    }

    mapping(uint256 => Report) public reports;
    uint256 public reportCount;
    mapping(address => uint256) public userReputationPoints;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ReportSubmitted(uint256 indexed id, address indexed reporter);
    event ReportResolved(uint256 indexed id);
    event ReportUpvoted(uint256 indexed id, address indexed voter);

    function submitReport(
        string memory _description,
        string memory _category,
        uint256[] memory _location
    ) public returns (uint256) {
        reportCount++;
        reports[reportCount] = Report({
            id: reportCount,
            reporter: msg.sender,
            description: _description,
            category: _category,
            timestamp: block.timestamp,
            status: "PENDING",
            upvotes: 0,
            isResolved: false,
            location: _location
        });

        userReputationPoints[msg.sender]++;
        emit ReportSubmitted(reportCount, msg.sender);
        return reportCount;
    }

    function getReportsCount() public view returns (uint256) {
        return reportCount;
    }

    function getReport(uint256 _id) public view returns (Report memory) {
        require(_id <= reportCount, "Report does not exist");
        return reports[_id];
    }
}
