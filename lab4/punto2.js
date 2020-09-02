const mcd = (a,b) => a === b ? a : a > b ? mcd(a-b, b) : mcd(a, b-a);
console.log(mcd(12,7))