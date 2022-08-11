const fs = require("fs");
const [N, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
let start = 1;
let mid = 0;
let end = N ** 2;
let result = 0;
while (start <= end) {
  mid = Math.floor((start + end) / 2);

  let count = 0;
  for (let i = 1; i <= N; i++) {
    if (count > k) break;
    if (mid > i * N) {
      count += N;
    } else {
      count += Math.floor(mid / i);
    }
  }
  if (count > k) {
    result = mid;
    end = mid - 1;
  } else if (count === k) {
    result = mid;
    break;
  } else {
    start = mid + 1;
  }
}

for (let i = result; i > 0; i--) {
  let flag = false;
  for (let j = 1; j <= N; j++) {
    if (i % j === 0 && i / j <= N) {
      flag = true;
      break;
    }
  }
  if (flag) {
    console.log(i);
    break;
  }
}
