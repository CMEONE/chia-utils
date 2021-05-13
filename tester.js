const { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, bytes_to_hex, hex_to_bytes } = require("./chia-utils.js");

function test1() {
	let address = "xch16uc2qsraln6293sfnd4w6epr50lzlc6xnafc090hshlk6k2turwssexsy4";
	let expected = "0xd730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd";
	if(address_to_puzzle_hash(address) != expected) {
		throw "Test 1: Failed";
	}
	console.log("Test 1: Passed");
}

function test2() {
	let puzzle_hash = "0xd730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd";
	let expected = "xch16uc2qsraln6293sfnd4w6epr50lzlc6xnafc090hshlk6k2turwssexsy4";
	if(address_to_puzzle_hash(puzzle_hash) != expected) {
		throw "Test 2: Failed";
	}
	console.log("Test 2: Passed");
}

function test3() {
	let parent_coin_info = "0x9e75d078aef282b4582697c201cbba6ee543b8a4f246120578aa4c27b17531d9";
	let puzzle_hash = "0x9e02a902f72923d603bb94f80c845fd10d01d94a07d2b5dfcb48ea9855850b03";
	let amount = 0.0000075;
	let expected = "0x9e75d078aef282b4582697c201cbba6ee543b8a4f246120578aa4c27b17531d9";
	if(get_coin_info(parent_coin_info, puzzle_hash, amount) != expected) {
		throw "Test 3: Failed";
	}
	console.log("Test 3: Passed");
}

function test4() {
	let bytes = [215, 48, 160, 64, 125, 252, 244, 162, 198, 9, 155, 106, 237, 100, 35, 163, 254, 47, 227, 70, 159, 83, 135, 149, 247, 133, 255, 109, 89, 75, 224, 221];
	let expected = "d730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd";
	if(bytes_to_hex(bytes) != expected) {
		throw "Test 4: Failed";
	}
	console.log("Test 4: Passed");
}

function test5() {
	let bytes = hex_to_bytes("d730a0407dfcf4a2c6099b6aed6423a3fe2fe3469f538795f785ff6d594be0dd");
	let expected = [215, 48, 160, 64, 125, 252, 244, 162, 198, 9, 155, 106, 237, 100, 35, 163, 254, 47, 227, 70, 159, 83, 135, 149, 247, 133, 255, 109, 89, 75, 224, 221];
	if(bytes.length != expected.length) {
		throw "Test 5: Failed";
	}
	for(let i = 0; i < bytes.length; i++) {
		if(bytes[i] != expected[i]) {
			throw "Test 5: Failed";
		}
	}
	console.log("Test 5: Passed");
}