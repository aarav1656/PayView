// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./PayView.sol";

contract FactoryPayView {
    mapping(uint256 => address) private payViewContract;
    uint256 private s_contractIdCounter;

    function createNewPayView(
        string memory _tokenName,
        string memory _symbol,
        string memory _uri,
        uint256 _amountCharge
    ) external payable {
        PayView payView = new PayView(_tokenName, _symbol, _uri, _amountCharge);
        s_contractIdCounter += 1;
        payViewContract[s_contractIdCounter] = address(payView);
    }

    function getPayViewContract(uint256 id) public view returns (address) {
        return payViewContract[id];
    }
}
