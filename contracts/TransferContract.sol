// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function transferEther(
        address payable _recipient,
        uint256 _amount
    ) public onlyOwner {
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0, "Amount must be greater than 0");
        require(
            address(this).balance >= _amount,
            "Insufficient contract balance"
        );

        _recipient.transfer(_amount);
    }

    // receive() external payable {
    // }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
