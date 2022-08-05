const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const dpArr = [0n, 1n, 2n];
for (let i = 3; i <= 1000000; i++) {
  dpArr[i] = (dpArr[i - 1] + dpArr[i - 2]) % 15746n;
}

console.log((dpArr[input] % 15746n).toString());
