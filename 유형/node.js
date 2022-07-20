const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
let dpArr = [[1n]];
let result = 0n;

for (let i = 1; i < 201; i++) {
  dpArr[i] = [];
  for (let j = 0; j < dpArr[i - 1].length + 1; j++) {
    if (j === 0) {
      dpArr[i][0] = dpArr[i - 1][0];
    } else if (j === dpArr[i - 1].length) {
      dpArr[i][dpArr[i - 1].length] = dpArr[i - 1][dpArr[i - 1].length - 1];
    } else {
      dpArr[i][j] = dpArr[i - 1][j] + dpArr[i - 1][j - 1];
    }
  }
}
if (input[1] >= input[0]) {
  for (let i = 0; i < input[0]; i++) {
    result += (dpArr[input[1]][i + 1] * dpArr[input[0] - 1][i]) % 1000000000n;
  }
} else {
  for (let i = 0; i < input[1]; i++) {
    result += (dpArr[input[1]][i + 1] * dpArr[input[0] - 1][i]) % 1000000000n;
  }
}
console.log((result % 1000000000n).toString());
