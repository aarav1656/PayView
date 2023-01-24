const hre = require("hardhat");

async function main() {
  const FactoryPayView = await hre.ethers.getContractFactory("FactoryPayView");
  const factory_payview = await FactoryPayView.deploy();

  await factory_payview.deployed();

  console.log(`deployed factory_payview to ${factory_payview.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
