const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const numberCardArr = input[1]
  .split(" ")
  .map(Number)
  .sort(function (a, b) {
    return a - b;
  });
const sangenHasArr = input[3].split(" ").map(Number);

function Search() {
  const resultArr = [];
  for (let i = 0; i < sangenHasArr.length; i++) {
    let start = 0;
    let mid = 0;
    let end = numberCardArr.length - 1;
    let result = null;
    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      if (numberCardArr[mid] > sangenHasArr[i]) {
        end = mid - 1;
      } else if (numberCardArr[mid] < sangenHasArr[i]) {
        start = mid + 1;
      } else {
        result = mid;
        break;
      }
    }
    if (result === null) {
      resultArr[i] = 0;
    } else {
      resultArr[i] = 1;
    }
  }
  return resultArr;
}
console.log(Search().join(" "));
