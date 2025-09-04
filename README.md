# MonoCoin 🪙

A decentralized ERC-20 token built on Ethereum using Solidity and Hardhat.

## Overview

MonoCoin is a simple ERC-20 token implementation that follows the OpenZeppelin standards. It provides basic token functionality including transfer, balance checking, and minting capabilities.

## Features

- ✅ ERC-20 compliant token
- ✅ Built with OpenZeppelin contracts
- ✅ Hardhat development environment
- ✅ Solidity 0.8.20
- ✅ Automated deployment scripts
- ✅ Local blockchain testing

## Smart Contract

The main contract `MonoCoin.sol` extends OpenZeppelin's ERC20 implementation:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MonoCoin is ERC20 {    
    constructor(uint256 initialSupply) ERC20("MonoCoin", "MONO") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
```

**Contract Details:**
- **Name**: MonoCoin
- **Symbol**: MONO
- **Decimals**: 18 (standard ERC-20)
- **Initial Supply**: Configurable via constructor

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
│   └── MonoCoin.sol   # Main token contract
├── scripts/            # Deployment and utility scripts
│   └── deploy.js      # Contract deployment script
├── test/              # Test files
├── hardhat.config.js  # Hardhat configuration
├── package.json       # Project dependencies
└── README.md          # This file
```

## Configuration

The project is configured with:
- **Solidity**: Version 0.8.20 with optimizer enabled
- **Networks**: Hardhat (local), localhost (127.0.0.1:8545)
- **Plugins**: @nomiclabs/hardhat-ethers for ethers.js integration

## Dependencies

### Production
- `@openzeppelin/contracts`: ^5.4.0 - Secure smart contract library

### Development
- `hardhat`: ^2.26.3 - Ethereum development environment
- `@nomiclabs/hardhat-ethers`: ^2.2.3 - Hardhat ethers.js integration
- `ethers`: ^5.8.0 - Ethereum library for JavaScript

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

### Get Token Info
```javascript
const name = await monocoin.name();        // "MonoCoin"
const symbol = await monocoin.symbol();    // "MONO"
const decimals = await monocoin.decimals(); // 18
```

## Testing

The project includes a testing framework. Run tests with:
```bash
npx hardhat test
```

## Deployment

1. **Local Development**: Use `--network hardhat` for in-memory testing
2. **Local Blockchain**: Start `npx hardhat node` and use `--network localhost`
3. **Testnets**: Configure network in `hardhat.config.js` and use appropriate private keys

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues:
- Check the [Hardhat documentation](https://hardhat.org/docs)
- Review [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts/)
- Open an issue on GitHub

## Roadmap

- [ ] Add more token features (burning, pausing)
- [ ] Implement governance mechanisms
- [ ] Add comprehensive test coverage
- [ ] Deploy to testnets
- [ ] Create frontend interface

---

Built with ❤️ using Hardhat and OpenZeppelin 