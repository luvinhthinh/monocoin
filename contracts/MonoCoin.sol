// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MonoCoin is ERC20, ERC20Burnable, Pausable, Ownable {    
    // Events for better tracking
    event TokensBurned(address indexed burner, uint256 amount);
    event ContractPaused(address indexed pauser);
    event ContractUnpaused(address indexed unpauser);
    
    constructor(uint256 initialSupply) ERC20("MonoCoin", "MONO") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
    
    /**
     * @dev Pause all token transfers
     * Only the owner can pause the contract
     */
    function pause() public onlyOwner {
        _pause();
        emit ContractPaused(msg.sender);
    }
    
    /**
     * @dev Unpause all token transfers
     * Only the owner can unpause the contract
     */
    function unpause() public onlyOwner {
        _unpause();
        emit ContractUnpaused(msg.sender);
    }
    
    /**
     * @dev Burn tokens from caller's account
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    /**
     * @dev Burn tokens from a specific account (requires allowance)
     * @param account Account to burn tokens from
     * @param amount Amount of tokens to burn
     */
    function burnFrom(address account, uint256 amount) public override {
        super.burnFrom(account, amount);
        emit TokensBurned(account, amount);
    }
    
    /**
     * @dev Override transfer function to add pausing functionality
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        require(!paused(), "Token transfer is paused");
        return super.transfer(to, amount);
    }
    
    /**
     * @dev Override transferFrom function to add pausing functionality
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        require(!paused(), "Token transfer is paused");
        return super.transferFrom(from, to, amount);
    }
    
    /**
     * @dev Override approve function to add pausing functionality
     */
    function approve(address spender, uint256 amount) public override returns (bool) {
        require(!paused(), "Token approval is paused");
        return super.approve(spender, amount);
    }
    
    /**
     * @dev Get the total supply of tokens
     * @return Total supply
     */
    function totalSupply() public view override returns (uint256) {
        return super.totalSupply();
    }
    
    /**
     * @dev Check if the contract is paused
     * @return True if paused, false otherwise
     */
    function isPaused() public view returns (bool) {
        return paused();
    }
}