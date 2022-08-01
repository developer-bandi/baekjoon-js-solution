const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("")
  .map(Number);

const inputSum = input.reduce((prev, current) => {
  return prev + current;
}, 0);

if (inputSum % 3 === 0 && input.indexOf(0) !== -1) {
  input.sort(function (a, b) {
    return b - a;
  });
  console.log(input.join(""));
} else {
  console.log(-1);
}
