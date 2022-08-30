const fs = require("fs");
const [N, ...cardCostArr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const dpArr = [];
for (let i = 1; i <= N; i++) {
  let maxNum = cardCostArr[i - 1];
  for (let j = 1; j < i; j++) {
    maxNum = Math.max(maxNum, dpArr[j] + dpArr[i - j]);
  }
  dpArr[i] = maxNum;
}
console.log(dpArr[N]);
