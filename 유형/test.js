const fs = require("fs");
const [N, K] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const dpArr = [];

for (let i = 1; i <= N; i++) {
  dpArr[i] = [];
  for (let j = 0; j <= i; j++) {
    if (j === 0 || i === j) {
      dpArr[i][j] = 1;
    } else if (j === 1) {
      dpArr[i][j] = i;
    } else {
      dpArr[i][j] = (dpArr[i - 1][j - 1] + dpArr[i - 1][j]) % 10007;
    }
  }
}
console.log(dpArr[N][K]);
