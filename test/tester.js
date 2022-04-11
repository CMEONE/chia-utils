const { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, bytes_to_hex, hex_to_bytes } = require("../chia-utils.js");
const assert = require("assert");

describe("Test", function() {
	it("1: Should convert an address to a puzzle hash", function() {
		let address = "xch16uc2qsraln6293sfnd4w6epr50lzlc6xnafc090hshlk6k2turwssexsy4";
		let expected = "0xd730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd";
		assert.equal(address_to_puzzle_hash(address), expected)
	});
	
	it("2: Should convert a puzzle hash to an address", function() {
		let puzzle_hash = "0xd730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd";
		let expected = "xch16uc2qsraln6293sfnd4w6epr50lzlc6xnafc090hshlk6k2turwssexsy4";
		assert.equal(puzzle_hash_to_address(puzzle_hash), expected)
	});
	
	it("3: Should calculate the coin info", function() {
		let parent_coin_info = "0x1b0025911a1769a295dc29c725e5ab414351ba8a421d23b98765d186a36a444f";
		let puzzle_hash = "0x9e02a902f72923d603bb94f80c845fd10d01d94a07d2b5dfcb48ea9855850b03";
		let amount = 0.0000075;
		let expected = "0x9e75d078aef282b4582697c201cbba6ee543b8a4f246120578aa4c27b17531d9";
		assert.equal(get_coin_info(parent_coin_info, puzzle_hash, amount), expected)
	});
	
	it("4: Should convert bytes to hex", function() {
		let bytes = [215, 48, 160, 64, 125, 252, 244, 162, 198, 9, 155, 106, 237, 100, 35, 163, 254, 47, 227, 70, 159, 83, 135, 149, 247, 133, 255, 109, 89, 75, 224, 221];
		let expected = "d730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd";
		assert.equal(bytes_to_hex(bytes), expected)
	});
	
	it("5: Should convert hex to bytes", function() {
		let bytes = hex_to_bytes("d730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd");
		let expected = [215, 48, 160, 64, 125, 252, 244, 162, 198, 9, 155, 106, 237, 100, 35, 163, 254, 47, 227, 70, 159, 83, 135, 149, 247, 133, 255, 109, 89, 75, 224, 221];
		assert.equal(bytes.length, expected.length);
		let equal = true;
		for(let i = 0; i < bytes.length; i++) {
			if(bytes[i] != expected[i]) {
				equal = false;
			}
		}
		assert.equal(equal, true);
	});

	it("6: Should convert a puzzle hash to an address with a non-default prefix", function() {
		let puzzle_hash = "0xd730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd";
		let expected = "txch16uc2qsraln6293sfnd4w6epr50lzlc6xnafc090hshlk6k2turwsa7px9x";
		assert.equal(puzzle_hash_to_address(puzzle_hash, "txch"), expected)
	});
});