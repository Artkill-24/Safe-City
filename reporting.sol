// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SafeCityReporting {
    struct Report {
        uint256 id;
        address reporter;
        string description;
        string reportType;
        uint256[] location;
        uint256 timestamp;
        string status;
    }

    mapping(uint256 => Report) public reports;
    uint256 public reportCount;

    event ReportSubmitted(uint256 indexed id, address indexed reporter);

    function submitReport(
        string memory _description,
        string memory _type,
        uint256[] memory _location
    ) public returns (uint256) {
        reportCount++;
        reports[reportCount] = Report({
            id: reportCount,
            reporter: msg.sender,
            description: _description,
            reportType: _type,
            location: _location,
            timestamp: block.timestamp,
            status: "PENDING"
        });

        emit ReportSubmitted(reportCount, msg.sender);
        return reportCount;
    }

    function getAllReports() public view returns (Report[] memory) {
        Report[] memory allReports = new Report[](reportCount);
        for(uint256 i = 1; i <= reportCount; i++) {
            allReports[i-1] = reports[i];
        }
        return allReports;
    }
}
