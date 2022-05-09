<!-- <p align="center">
  <a href="https://chia.togatech.org/" target="_blank" rel="noopener noreferrer">
    <img src="https://chia.togatech.org/favicon.ico" width="50" alt="Chia-Utils Logo">
  </a>
</p> -->

<h1 align="center">Unofficial Library: Chia-Utils</h1>
<p align="center">
  <a href="https://github.com/CMEONE/chia-utils/actions"><img src="https://img.shields.io/github/workflow/status/CMEONE/chia-utils/Node.js%20CI" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://img.shields.io/npm/v/chia-utils.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://img.shields.io/npm/l/chia-utils.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://img.shields.io/npm/dm/chia-utils.svg?sanitize=true" alt="Monthly Downloads"></a>
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://img.shields.io/npm/dt/chia-utils.svg?sanitize=true" alt="Total Downloads"></a>
  <!--<a href="https://www.npmjs.com/package/chia-utils"><img src="https://badgen.net/bundlephobia/min/chia-utils?color=green&label=minified" alt="Minified"></a>
  <a href="https://www.npmjs.com/package/chia-utils"><img src="https://badgen.net/bundlephobia/minzip/chia-utils?color=green&label=gzipped" alt="Gzipped"></a>-->
</p>

A set of JavaScript utilities to facilitate conversions for the Chia network

## Table of Contents
- [Install](#install)
- [Address to Puzzle Hash](#address-to-puzzle-hash)
- [Puzzle Hash to Address](#puzzle-hash-to-address)
- [Get Coin Info](#get-coin-info)
- [Get Coin Info Mojo](#get-coin-info-mojo)
- [Bytes to Hex](#bytes-to-hex)
- [Hex to Bytes](#hex-to-bytes)

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
const { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, get_coin_info_mojo, bytes_to_hex, hex_to_bytes } = require("chia-utils");
```

To include from file:
```javascript
const { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, get_coin_info_mojo, bytes_to_hex, hex_to_bytes } = require("./chia-utils.js");
```

To use in the browser:
```html
<script type="text/javascript" src="chia-utils.js"></script>
<script>
  ChiaUtils.address_to_puzzle_hash( ... )
  ChiaUtils.puzzle_hash_to_address( ... )
  ChiaUtils.get_coin_info( ... )
  ChiaUtils.get_coin_info_mojo( ... )
  ChiaUtils.bytes_to_hex( ... )
  ChiaUtils.hex_to_bytes( ... )
</script>
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
let address = puzzle_hash_to_address(puzzle_hash, prefix = "xch");
```
**Parameters:**
- puzzle_hash: string ("0x...")
- prefix: string ("xch") - default: "xch"

**Return type:** string ("xch1...")

## Get Coin Info
```javascript
let coin_info = get_coin_info(parent_coin_info, puzzle_hash, amount_decimal);
```
**Parameters:**
- parent_coin_info: string ("0x...")
- puzzle_hash: string ("0x...")
- amount_decimal: number (0.01)

**Return type:** string ("0x...")

## Get Coin Info Mojo 
```javascript
let coin_info = get_coin_info_mojo(parent_coin_info, puzzle_hash, amount);
```
**Parameters:**
- parent_coin_info: string ("0x...")
- puzzle_hash: string ("0x...")
- amount: number (1000000000000)

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
