const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("FactoryPayView", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFactoryContractFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const FactoryPayView = await ethers.getContractFactory("FactoryPayView");
    const factory_payview = await FactoryPayView.deploy();

    const tokenName = "PayView";
    const tokenSymbol = "PVY";
    const tokenUri = "http://uri";
    const ammount_to_charge = "10"; // this is in wei

    return {
      factory_payview,
      tokenName,
      tokenSymbol,
      tokenUri,
      ammount_to_charge,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should create a PayView contract through FactoryContract", async function () {
      const {
        factory_payview,
        tokenName,
        tokenSymbol,
        tokenUri,
        ammount_to_charge,
        owner,
        otherAccount,
      } = await loadFixture(deployFactoryContractFixture);
      const payView = await factory_payview.createNewPayView(
        tokenName,
        tokenSymbol,
        tokenUri,
        ammount_to_charge
      );
      const id = await factory_payview.getPayViewContract(1);
      console.log(id);
    });
  });
});
