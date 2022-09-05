const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const dpArr = [0];

for (let i = 1; i < input.length; i++) {
  let start = 0;
  let end = dpArr.length - 1;
  let mid = 0;
  let result = null;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (dpArr[mid] < input[i]) {
      result = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  dpArr[result + 1] = input[i];
}

console.log(input.length - dpArr.length);
