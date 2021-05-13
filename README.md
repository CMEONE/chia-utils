<p align="center">
  <a href="https://chia.togatech.org/" target="_blank" rel="noopener noreferrer">
    <img src="https://chia.togatech.org/favicon.ico" width="50" alt="Chia-Utils Logo">
  </a>
</p>

<h1 align="center">Chia-Utils</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://img.shields.io/npm/v/chia-utils.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://img.shields.io/npm/l/chia-utils.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://img.shields.io/npm/dm/chia-utils.svg?sanitize=true" alt="Monthly Downloads"></a>
</p>

A set of JavaScript utilities to facilitate conversions for the Chia network

## Table of Contents
- [Install](https://github.com/CMEONE/chia-utils#install)
- [Address to Puzzle Hash](https://github.com/CMEONE/chia-utils#address-to-puzzle-hash)
- [Puzzle Hash to Address](https://github.com/CMEONE/chia-utils#puzzle-hash-to-address)
- [Get Coin Info](https://github.com/CMEONE/chia-utils#get-coin-info)
- [Bytes to Hex](https://github.com/CMEONE/chia-utils#get-coin-info)
- [Hex to Bytes](https://github.com/CMEONE/chia-utils#get-coin-info)

## Install
To install from NPM:
```bash
npm install chia-utils
```

To install from GitHub:
```bash
git clone https://github.com/CMEONE/chia-utils.git
```

To test:
```bash
npm install
npm test
```

To include from NPM:
```javascript
const { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, bytes_to_hex, hex_to_bytes } = require("chia-utils");
```

To include from file:
```javascript
const { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, bytes_to_hex, hex_to_bytes } = require("./chia-utils.js");
```

## Address to Puzzle Hash
```javascript
let puzzle_hash = address_to_puzzle_hash(address);
```
**Parameters:**
- address: string ("xch1...")

**Return type:** string ("0x...")

## Puzzle Hash to Address
```javascript
let address = puzzle_hash_to_address(puzzle_hash);
```
**Parameters:**
- puzzle_hash: string ("0x...")

**Return type:** string ("xch1...")

## Get Coin Info
```javascript
let coin_info = get_coin_info(parent_coin_info, puzzle_hash, amount);
```
**Parameters:**
- parent_coin_info: string ("0x...")
- puzzle_hash: string ("0x...")
- amount: number (0.01)

**Return type:** string ("0x...")

## Bytes to Hex
```javascript
let hex = bytes_to_hex(bytes);
```
**Parameters:**
- bytes: Array or Uint8Array ([0, 255, ...])

**Return type:** string ("fedcba9876543210...")

## Hex to Bytes
```javascript
let bytes = hex_to_bytes(hex);
```
**Parameters:**
- hex: string ("fedcba9876543210...")

**Return type:** Uint8Array ([0, 255, ...])