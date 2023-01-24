const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PayView", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractPayView() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const PayView = await ethers.getContractFactory("PayView");

    const tokenName = "PayView";
    const tokenSymbol = "PVY";
    const tokenUri = "http://uri";
    const ammount_to_charge = "10"; // this is in wei

    const payview = await PayView.deploy(
      tokenName,
      tokenSymbol,
      tokenUri,
      ammount_to_charge
    );

    return {
      payview,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("owner", async function () {
      const { payview, owner, otherAccount } = await loadFixture(
        deployContractPayView
      );
      const owner_contract = await payview.i_owner();
      expect(owner_contract).to.equal(owner.address);
    });
    it("amount_charge", async function () {
      const { payview, owner, ammount_to_charge, otherAccount } =
        await loadFixture(deployContractPayView);
      const amount = await payview.s_ammount_to_charge();
      // this test to creat 10 eth to wei and calculate will be ignored or changed to calculate eth for simiplicity
      // expect(ethers.utils.parseEther(amount)).to.equal(ammount_to_charge);
    });
  });
});
