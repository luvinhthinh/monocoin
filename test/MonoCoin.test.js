const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MonoCoin", function () {
  let MonoCoin;
  let monocoin;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
    // Deploy contract
    MonoCoin = await ethers.getContractFactory("MonoCoin");
    monocoin = await MonoCoin.deploy(1000); // 1000 initial supply
    await monocoin.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await monocoin.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await monocoin.balanceOf(owner.address);
      const totalSupply = await monocoin.totalSupply();
      expect(ownerBalance.toString()).to.equal(totalSupply.toString());
    });

    it("Should set the correct token name and symbol", async function () {
      expect(await monocoin.name()).to.equal("MonoCoin");
      expect(await monocoin.symbol()).to.equal("MONO");
    });

    it("Should set the correct decimals", async function () {
      expect(await monocoin.decimals()).to.equal(18);
    });
  });

  describe("Pausing", function () {
    it("Should allow owner to pause the contract", async function () {
      await monocoin.pause();
      expect(await monocoin.isPaused()).to.be.true;
    });

    it("Should allow owner to unpause the contract", async function () {
      await monocoin.pause();
      await monocoin.unpause();
      expect(await monocoin.isPaused()).to.be.false;
    });

    it("Should not allow non-owner to pause the contract", async function () {
      try {
        await monocoin.connect(addr1).pause();
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });

    it("Should not allow non-owner to unpause the contract", async function () {
      await monocoin.pause();
      try {
        await monocoin.connect(addr1).unpause();
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("OwnableUnauthorizedAccount");
      }
    });

    it("Should prevent transfers when paused", async function () {
      await monocoin.pause();
      try {
        await monocoin.transfer(addr1.address, 100);
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error.message).to.include("Token transfer is paused");
      }
    });

    it("Should allow transfers when unpaused", async function () {
      await monocoin.pause();
      await monocoin.unpause();
      await monocoin.transfer(addr1.address, 100);
      const balance = await monocoin.balanceOf(addr1.address);
      expect(balance.toString()).to.equal("100");
    });
  });

  describe("Burning", function () {
    beforeEach(async function () {
      // Transfer some tokens to addr1 for testing (500 tokens = 500 * 10^18 wei)
      await monocoin.transfer(addr1.address, ethers.utils.parseEther("500"));
    });

    it("Should allow users to burn their own tokens", async function () {
      const initialBalance = await monocoin.balanceOf(addr1.address);
      const burnAmount = ethers.utils.parseEther("100");
      
      await monocoin.connect(addr1).burn(burnAmount);
      
      const finalBalance = await monocoin.balanceOf(addr1.address);
      expect(finalBalance.toString()).to.equal(initialBalance.sub(burnAmount).toString());
    });

    it("Should allow burning with allowance", async function () {
      const burnAmount = ethers.utils.parseEther("100");
      
      // Approve owner to burn tokens from addr1
      await monocoin.connect(addr1).approve(owner.address, burnAmount);
      
      // Owner burns tokens from addr1
      await monocoin.burnFrom(addr1.address, burnAmount);
      
      const finalBalance = await monocoin.balanceOf(addr1.address);
      expect(finalBalance.toString()).to.equal(ethers.utils.parseEther("400").toString());
    });

    it("Should not allow burning more tokens than balance", async function () {
      const balance = await monocoin.balanceOf(addr1.address);
      const burnAmount = balance.add(ethers.utils.parseEther("100"));
      
      let errorThrown = false;
      try {
        await monocoin.connect(addr1).burn(burnAmount);
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).to.be.true;
    });

    it("Should not allow burning with insufficient allowance", async function () {
      const burnAmount = ethers.utils.parseEther("100");
      
      // Approve less than burn amount
      await monocoin.connect(addr1).approve(owner.address, ethers.utils.parseEther("50"));
      
      let errorThrown = false;
      try {
        await monocoin.burnFrom(addr1.address, burnAmount);
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).to.be.true;
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      await monocoin.transfer(addr1.address, 100);
      const addr1Balance = await monocoin.balanceOf(addr1.address);
      expect(addr1Balance.toString()).to.equal("100");
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      let errorThrown = false;
      try {
        await monocoin.connect(addr1).transfer(owner.address, 1);
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).to.be.true;
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await monocoin.balanceOf(owner.address);
      await monocoin.transfer(addr1.address, 100);
      await monocoin.transfer(addr2.address, 100);
      
      const finalOwnerBalance = await monocoin.balanceOf(owner.address);
      expect(finalOwnerBalance.toString()).to.equal(initialOwnerBalance.sub(200).toString());
      
      const addr1Balance = await monocoin.balanceOf(addr1.address);
      const addr2Balance = await monocoin.balanceOf(addr2.address);
      expect(addr1Balance.toString()).to.equal("100");
      expect(addr2Balance.toString()).to.equal("100");
    });
  });

  describe("Allowances", function () {
    it("Should approve and transfer with allowance", async function () {
      await monocoin.approve(addr1.address, 100);
      await monocoin.connect(addr1).transferFrom(owner.address, addr2.address, 100);
      
      const addr2Balance = await monocoin.balanceOf(addr2.address);
      expect(addr2Balance.toString()).to.equal("100");
    });

    it("Should fail transferFrom with insufficient allowance", async function () {
      await monocoin.approve(addr1.address, 99);
      let errorThrown = false;
      try {
        await monocoin.connect(addr1).transferFrom(owner.address, addr2.address, 100);
      } catch (error) {
        errorThrown = true;
      }
      expect(errorThrown).to.be.true;
    });
  });
}); 