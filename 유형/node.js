const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const dpArr = [0, 1n, 3n];

for (let i = 3; i <= 1000; i++) {
  dpArr[i] = dpArr[i - 2] * 2n + dpArr[i - 1];
}
console.log((dpArr[input] % 10007n).toString());
