const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);
input.shift();
const numberCount = new Array(8001).fill(0);
let manyCount = 0;
let manyNumberArr = [];
let sum = 0;
for (let i = 0; i < input.length; i++) {
  numberCount[input[i] + 4000] += 1;
  sum += input[i];
}

for (let i = 0; i < numberCount.length; i++) {
  if (manyCount === numberCount[i] && manyNumberArr.length < 2) {
    manyNumberArr.push(i - 4000);
  } else if (manyCount < numberCount[i]) {
    manyCount = numberCount[i];
    manyNumberArr = [i - 4000];
  }
}

input.sort(function (a, b) {
  return a - b;
});
console.log(
  Math.round(sum / input.length) === -0 ? 0 : Math.round(sum / input.length)
);
console.log(input[Math.floor(input.length / 2)]);
console.log(
  manyNumberArr[1] === undefined ? manyNumberArr[0] : manyNumberArr[1]
);
console.log(input[input.length - 1] - input[0]);
