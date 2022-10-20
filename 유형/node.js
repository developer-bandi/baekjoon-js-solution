const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("")
  .map(Number);
input.unshift(1);
let count = [1n, 1n];
if (input[1] === 0) {
  console.log(0);
} else {
  for (let i = 2; i < input.length; i++) {
    if (input[i - 1] === 1) {
      if (input[i] === 0) {
        count.push(count[i - 2]);
      } else {
        count.push(count[i - 1] + count[i - 2]);
      }
    } else if (input[i - 1] === 2) {
      if (input[i] === 0) {
        count.push(count[i - 2]);
      } else if (input[i] < 7) {
        count.push(count[i - 1] + count[i - 2]);
      } else {
        count.push(count[i - 1]);
      }
    } else {
      if (input[i] === 0) {
        count = 0;
        break;
      } else {
        count.push(count[i - 1]);
      }
    }
  }
  console.log(
    count === 0 ? 0 : (count[count.length - 1] % 1000000n).toString()
  );
}
