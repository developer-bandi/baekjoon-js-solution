const fs = require("fs");
const [totaltargetNum, tree] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [total, targetNum] = totaltargetNum.split(" ").map(Number);
const treeArr = tree.split(" ").map(Number);
let start = 0,
  end = Math.max(...treeArr),
  result = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let sum = targetNum;
  let check = false;
  for (let i = 0; i < treeArr.length; i++) {
    if (treeArr[i] > mid) {
      sum = sum - treeArr[i] + mid;
      if (sum <= 0) {
        check = true;
        break;
      }
    }
  }

  if (check) {
    result = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}
console.log(result);
