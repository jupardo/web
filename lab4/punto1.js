function secret(msg, mode, count) {
    let functions = {
        encrypt: msg.map((value) => value + count),
        decrypt: msg.map((value) => value - count)
    }
    return functions[mode];
}

console.log(secret([1, 4, 7, 10], 'encrypt', 5));
console.log(secret([6, 9, 12, 15], 'decrypt', 5));
