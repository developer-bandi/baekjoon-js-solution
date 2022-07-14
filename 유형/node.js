const fs = require("fs");
const [totaltargetNum, ...lanLine] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [total, targetNum] = totaltargetNum.split(" ").map(Number);
const lanLineArr = lanLine.map(Number);
let start = 0,
  end = Math.max(...lanLineArr),
  result = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let sum = 0;
  for (let i = 0; i < lanLineArr.length; i++) {
    sum += Math.floor(lanLineArr[i] / mid);
  }

  if (sum >= targetNum) {
    result = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}
console.log(result);
