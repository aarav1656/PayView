// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./PayView.sol";

contract FactoryPayView {
    uint256 private s_contractIdCounter;
    address public immutable i_owner;

    mapping(uint256 => address) private payViewContract;
    mapping(address => PayView) public payViewContractCode;

    receive() external payable {}

    constructor() {
        i_owner = msg.sender;
    }

    function createNewPayView(
        string memory _tokenName,
        string memory _symbol,
        string memory _uri,
        uint256 _amountCharge
    ) external payable {
        PayView payView = new PayView(_tokenName, _symbol, _uri, _amountCharge);
        s_contractIdCounter += 1;
        payViewContract[s_contractIdCounter] = address(payView);
        payViewContractCode[address(payView)] = payView;
    }

    function getPayViewContract(uint256 id) public view returns (address) {
        return payViewContract[id];
    }

    function withdraw() external payable {
        require(i_owner == msg.sender, "You ain't owner");
        (bool sent, ) = i_owner.call{value: address(this).balance}("");
        require(sent, "tx failed");
    }
}
