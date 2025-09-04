const { ethers } = require("hardhat");

async function main() {
  const [owner, user] = await ethers.getSigners();

  const MonoCoin = await ethers.getContractFactory("MonoCoin");
  const monocoin = await MonoCoin.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3"); // paste deployed address

  console.log("Owner balance:", (await monocoin.balanceOf(owner.address)).toString());

  // Transfer 100 MONO to user
  const tx = await monocoin.transfer(user.address, ethers.utils.parseUnits("100", 18));
  await tx.wait();

  console.log("User balance after transfer:", (await monocoin.balanceOf(user.address)).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
