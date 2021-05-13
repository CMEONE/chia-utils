let createHash;
try {
    createHash = (require("crypto")).createHash;
} catch(err) {
    createHash = function() {
        throw "Hashing is not supported."
    }
}

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else if(window != undefined) {
        //window.ChiaUtils = factory();
        throw "chia-utils is not currently supported in the browser.";
    } else {
        root.returnExports = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
    const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";


    function bech32_polymod(values) {
        let generator = [0x3B6A57B2, 0x26508E6D, 0x1EA119FA, 0x3D4233DD, 0x2A1462B3];
        let chk = 1;
        for(value in values) {
            value = values[value];
            top = chk >> 25
            chk = (chk & 0x1FFFFFF) << 5 ^ value
            for(let i = 0; i < 5; i++) {
                if((top >> i) & 1) {
                    chk ^= generator[i];
                } else {
                    chk ^= 0;
                }
            }
        }
        return chk;
    }


    function bech32_hrp_expand(hrp) {
        let arr = [];
        for(x in hrp) {
            x = hrp[x];
            arr.push(ord(x) >> 5);
        }
        arr.push(0);
        for(x in hrp) {
            x = hrp[x];
            arr.push(ord(x) & 31);
        }
        return arr;
    }


    const M = 0x2BC830A3;


    function bech32_verify_checksum(hrp, data) {
        return bech32_polymod(bech32_hrp_expand(hrp).concat(data)) == M;
    }


    function bech32_create_checksum(hrp, data) {
        let values = bech32_hrp_expand(hrp).concat(data);
        let polymod = bech32_polymod(values.concat([0, 0, 0, 0, 0, 0])) ^ M;
        let arr = [];
        for(let i = 0; i < 6; i++) {
            arr.push((polymod >> 5 * (5 - i)) & 31);
        }
        return arr;
    }


    function bech32_encode(hrp, data) {
        let combined = data.concat(bech32_create_checksum(hrp, data));
        let arr = [hrp, "1"];
        for(d in combined) {
            d = combined[d];
            arr.push(CHARSET[d]);
        }
        return arr.join("");
    }

    function ord(str) {
        return str.charCodeAt(0);
    }

    function any(iterable) {
        for(let i = 0; i < iterable.length; i++) {
            if(iterable[i]) {
                return true;
            }
        }
        return false;
    }

    function all(iterable) {
        for(let i = 0; i < iterable.length; i++) {
            if(!iterable[i]) {
                return false;
            }
        }
        return true;
    }


    function bech32_decode(bech) {
        let arr = [];
        for(x in bech) {
            x = bech[x];
            arr.push(ord(x) < 33 || ord(x) > 126);
        }
        if(any(arr) || (bech.toLowerCase() != bech)) {
            return [null, null];
        }
        bech = bech.toLowerCase();
        let pos = bech.lastIndexOf("1");
        if(pos < 1 || pos + 7 > bech.length || bech.length > 90) {
            return [null, null];
        }
        arr = [];
        for(x in bech.slice(pos + 1)) {
            x = bech.slice(pos + 1)[x];
            arr.push(CHARSET.includes(x));
        }
        if(!all(arr)) {
            return [null, null];
        }
        let hrp = bech.slice(0, pos);
        let data = [];
        for(x in bech.slice(pos + 1)) {
            x = bech.slice(pos + 1)[x];
            data.push(CHARSET.indexOf(x));
        }
        if(!bech32_verify_checksum(hrp, data)) {
            return [null, null];
        }
        return [hrp, data.slice(0, data.length - 6)]
    }


    function convertbits(data, frombits, tobits, pad = true) {
        let acc = 0;
        let bits = 0;
        let ret = [];
        let maxv = (1 << tobits) - 1;
        let max_acc = (1 << (frombits + tobits - 1)) - 1;
        for(value in data) {
            value = data[value];
            if(value < 0 || (value >> frombits))  {
                throw "Invalid Value";
            }
            acc = ((acc << frombits) | value) & max_acc;
            bits += frombits;
            while(bits >= tobits) {
                bits -= tobits;
                ret.push((acc >> bits) & maxv);
            }
        }
        if(pad) {
            if(bits) {
                ret.push((acc << (tobits - bits)) & maxv);
            }
        } else if(bits >= frombits || ((acc << (tobits - bits)) & maxv)) {
            throw "Invalid bits";
        }
        return ret;
    }


    function encode_puzzle_hash(puzzle_hash, prefix) {
        encoded = bech32_encode(prefix, convertbits(puzzle_hash, 8, 5));
        return encoded;
    }

    function decode_puzzle_hash(address) {
        let d = bech32_decode(address);
        let hrpgot = d[0];
        let data = d[1];
        if(data == null) {
            throw "Invalid Address";
        }
        let decoded = convertbits(data, 5, 8, false);
        return decoded;
    }

    function bytes_to_hex(bytes) {
        if(bytes == null) {
            throw "Argument bytes of method bytes_to_hex is required and does not have a default value.";
        }
        let hex = "";
        for(let i = 0; i < bytes.length; i++) {
            if(bytes[i].toString(16).length == 0) {
                hex += "00";
            } else if(bytes[i].toString(16).length == 1) {
                hex += "0" + bytes[i].toString(16);
            } else {
                hex += bytes[i].toString(16);
            }
        }
        return hex;
    }

    function hex_to_bytes(hex) {
        if(hex == null) {
            throw "Argument hex of method hex_to_bytes is required and does not have a default value.";
        }
        let bytes = new Uint8Array(hex.length / 2);
        for(let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }
        return bytes;
    }

    function address_to_puzzle_hash(address) {
        return "0x" + bytes_to_hex(decode_puzzle_hash(address));
    }

    function puzzle_hash_to_address(puzzle_hash) {
        if(puzzle_hash.indexOf("0x") == 0) {
            puzzle_hash = puzzle_hash.substring(2);
        }
        return encode_puzzle_hash(hex_to_bytes(puzzle_hash), "xch");
    }

    function get_coin_info(parent_coin_info, puzzle_hash, amount) {
        amount = amount * 1000000000000;
        if(parent_coin_info.indexOf("0x") == 0) {
            parent_coin_info = parent_coin_info.substring(2);
        }
        if(puzzle_hash.indexOf("0x") == 0) {
            puzzle_hash = puzzle_hash.substring(2);
        }
        const a = Buffer.from(parent_coin_info, 'hex')
        const b = Buffer.from(puzzle_hash, 'hex')
        let amountHex = amount.toString(16);
        if (amountHex.length % 2 == 1) {
            amountHex = '0' + amountHex
        }
        const c = Buffer.from(amountHex, 'hex');

        const d = Buffer.concat([a, b, c], a.length + b.length + c.length);
        const hash = createHash('sha256');
        hash.update(d);
        return "0x" + hash.digest('hex');
    }


    return { address_to_puzzle_hash, puzzle_hash_to_address, get_coin_info, bytes_to_hex, hex_to_bytes };
}));