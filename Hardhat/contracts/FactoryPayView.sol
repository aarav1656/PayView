// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./PayView.sol";

contract FactoryPayView {
    uint256 public s_contractIdCounter; // counter of total deployments
    address public immutable i_owner; // platform owner

    mapping(uint256 => address) private payViewContract;

    receive() external payable {}

    // here we create the platform payview but on mainnet you will use multisig with delegate call
    // but here we will simply use the
    constructor() {
        i_owner = msg.sender;
    }

    // deploys new contract that creates another contract which is
    function createNewPayView(
        string memory _tokenName,
        string memory _symbol,
        string memory _uri,
        uint256 _amountCharge,
        string memory _vid_cid
    ) external payable {
        PayView payView = new PayView(
            _tokenName,
            _symbol,
            _uri,
            _amountCharge,
            _vid_cid
        );
        s_contractIdCounter += 1;
        payViewContract[s_contractIdCounter] = address(payView);
    }

    // here we see the address of deployed contracts
    function getPayViewContract(uint256 id) public view returns (address) {
        return payViewContract[id];
    }

    // platform gets ~10% of eth when the nft is minted by user on client contract
    function withdraw() external payable {
        require(i_owner == msg.sender, "You ain't pkatform provider");
        (bool sent, ) = i_owner.call{value: address(this).balance}("");
        require(sent, "tx failed");
    }
}
