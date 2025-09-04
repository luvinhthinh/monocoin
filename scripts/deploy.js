const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const MonoCoin = await hre.ethers.getContractFactory("MonoCoin");
  const monocoin = await MonoCoin.deploy(1000); // 1000 initial supply

  await monocoin.deployed();

  console.log("MonoCoin deployed to:", monocoin.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
