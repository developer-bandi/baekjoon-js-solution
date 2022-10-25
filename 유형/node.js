const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const target = Number(input[0]);
const targetLength = input[0].length;
const deletedNumber = input[1] === "0" ? [] : input[2].split(" ").map(Number);
let result = Math.abs(target - 100);
for (let i = 0; i < 500000; i++) {
  let plag = [true, true];
  let plus = target + i;
  let minus = target - i;
  while (minus !== 0 && !flag) {
    if (deletedNumber.indexOf(minus % 10) !== -1) {
      break;
    }
    minus = Math.floor(minus / 10);
  }
  while (plus !== 0) {
    if (deletedNumber.indexOf(plus % 10) !== -1) {
      break;
    }
    plus = Math.floor(plus / 10);
  }
}
