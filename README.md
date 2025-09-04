# MonoCoin 🪙

A decentralized ERC-20 token built on Ethereum using Solidity and Hardhat, featuring advanced token management capabilities including burning and pausing.

## Overview

MonoCoin is a feature-rich ERC-20 token implementation that follows the OpenZeppelin standards. It provides comprehensive token functionality including transfer, balance checking, minting, burning, and emergency pause mechanisms for enhanced security and control.

## Features

- ✅ ERC-20 compliant token
- ✅ Built with OpenZeppelin contracts v5
- ✅ Hardhat development environment
- ✅ Solidity 0.8.20 with optimizer
- ✅ **Token burning capabilities** (self-burn and approved burn)
- ✅ **Emergency pause mechanism** (owner-controlled)
- ✅ Automated deployment scripts
- ✅ Comprehensive test coverage (19 tests)
- ✅ Local blockchain testing
- ✅ Role-based access control

## Smart Contract

The enhanced `MonoCoin.sol` contract extends OpenZeppelin's ERC20 implementation with additional security and management features:

```solidity
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
    
    // Pausing functions
    function pause() public onlyOwner
    function unpause() public onlyOwner
    function isPaused() public view returns (bool)
    
    // Burning functions
    function burn(uint256 amount) public override
    function burnFrom(address account, uint256 amount) public override
    
    // Enhanced transfer functions with pause protection
    function transfer(address to, uint256 amount) public override returns (bool)
    function transferFrom(address from, address to, uint256 amount) public override returns (bool)
    function approve(address spender, uint256 amount) public override returns (bool)
}
```

**Contract Details:**
- **Name**: MonoCoin
- **Symbol**: MONO
- **Decimals**: 18 (standard ERC-20)
- **Initial Supply**: Configurable via constructor
- **Owner**: Deployer address with special privileges

## New Features

### 🔥 Token Burning
- **Self-burning**: Users can burn their own tokens to reduce total supply
- **Approved burning**: Users can approve others to burn tokens from their account
- **Event tracking**: All burn operations emit `TokensBurned` events
- **Safety checks**: Prevents burning more tokens than available balance

### ⏸️ Emergency Pause
- **Owner control**: Only contract owner can pause/unpause
- **Comprehensive coverage**: Affects all token transfer operations
- **Emergency response**: Allows immediate suspension of token operations
- **Event logging**: Pause state changes are logged for transparency

### 🔒 Enhanced Security
- **Role-based access**: Owner-only pause controls
- **Transfer protection**: All transfers respect pause state
- **Approval protection**: Approvals are blocked when paused
- **OpenZeppelin standards**: Built on audited, secure contracts

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/luvinhthinh/monocoin.git
cd monocoin
```

2. Install dependencies:
```bash
npm install
```

## Development

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

**Test Coverage**: 19 comprehensive tests covering:
- Contract deployment and configuration
- Pausing and unpausing functionality
- Token burning (self and approved)
- Transfer operations and allowances
- Security controls and access restrictions

### Start Local Blockchain
```bash
npx hardhat node
```

### Deploy Contracts

**To Hardhat Network (in-memory):**
```bash
npx hardhat run scripts/deploy.js --network hardhat
```

**To Local Blockchain:**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

**To Testnet/Mainnet:**
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## Project Structure

```
monocoin/
├── contracts/          # Smart contract source files
│   └── MonoCoin.sol   # Enhanced token contract with burning & pausing
├── scripts/            # Deployment and utility scripts
│   └── deploy.js      # Contract deployment script
├── test/              # Comprehensive test suite
│   └── MonoCoin.test.js # 19 test cases covering all features
├── hardhat.config.js  # Hardhat configuration
├── package.json       # Project dependencies
└── README.md          # This file
```

## Configuration

The project is configured with:
- **Solidity**: Version 0.8.20 with optimizer enabled (200 runs)
- **Networks**: Hardhat (local), localhost (127.0.0.1:8545)
- **Plugins**: @nomiclabs/hardhat-ethers for ethers.js integration
- **Testing**: Chai assertions with comprehensive coverage

## Dependencies

### Production
- `@openzeppelin/contracts`: ^5.4.0 - Secure smart contract library

### Development
- `hardhat`: ^2.26.3 - Ethereum development environment
- `@nomiclabs/hardhat-ethers`: ^2.2.3 - Hardhat ethers.js integration
- `ethers`: ^5.8.0 - Ethereum library for JavaScript
- `chai`: ^4.3.10 - Testing assertion library

## Usage Examples

### Check Token Balance
```javascript
const balance = await monocoin.balanceOf(userAddress);
console.log(`Balance: ${ethers.utils.formatEther(balance)} MONO`);
```

### Transfer Tokens
```javascript
const tx = await monocoin.transfer(recipientAddress, amount);
await tx.wait();
```

### Burn Tokens
```javascript
// Burn your own tokens
await monocoin.burn(ethers.utils.parseEther("100"));

// Burn tokens from another account (requires approval)
await monocoin.burnFrom(accountAddress, ethers.utils.parseEther("50"));
```

### Pause/Unpause Contract
```javascript
// Only owner can pause
await monocoin.pause();

// Check pause status
const isPaused = await monocoin.isPaused();

// Unpause when ready
await monocoin.unpause();
```

### Get Token Info
```javascript
const name = await monocoin.name();        // "MonoCoin"
const symbol = await monocoin.symbol();    // "MONO"
const decimals = await monocoin.decimals(); // 18
const totalSupply = await monocoin.totalSupply();
```

## Testing

The project includes comprehensive testing with 19 test cases covering all functionality:

```bash
npx hardhat test
```

**Test Categories:**
- ✅ Deployment & Configuration (4 tests)
- ✅ Pausing Functionality (6 tests)
- ✅ Burning Capabilities (4 tests)
- ✅ Transfer Operations (3 tests)
- ✅ Allowance Management (2 tests)

## Deployment

1. **Local Development**: Use `--network hardhat` for in-memory testing
2. **Local Blockchain**: Start `npx hardhat node` and use `--network localhost`
3. **Testnets**: Configure network in `hardhat.config.js` and use appropriate private keys

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues:
- Check the [Hardhat documentation](https://hardhat.org/docs)
- Review [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts/)
- Open an issue on GitHub

## Roadmap

- [x] Add more token features (burning, pausing)
- [x] Implement comprehensive test coverage
- [ ] Add governance mechanisms
- [ ] Deploy to testnets
- [ ] Create frontend interface
- [ ] Add more advanced tokenomics features

## Recent Updates

**Latest Release**: Enhanced with burning and pausing capabilities
- ✅ Added token burning functionality (self and approved)
- ✅ Implemented emergency pause mechanism
- ✅ Enhanced security with role-based access control
- ✅ Comprehensive test coverage (19 tests)
- ✅ Improved error handling and event logging

---

Built with ❤️ using Hardhat and OpenZeppelin 