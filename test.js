const [N, d, k, c, ...list] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

let left = 0;
let right = k - 1;
const record = new Array(d + 1).fill(0);
let sum = 1;
record[c] += 1;
new Array(k).fill(0).forEach((_, index) => {
  if (record[list[index]] === 0) {
    sum += 1;
  }
  record[list[index]] += 1;
});
let max = sum;

while (right !== k - 2) {
  left += 1;
  right += 1;
  if (right === list.length) right = 0;
  if (record[list[left - 1]] === 1) {
    sum -= 1;
  }
  record[list[left - 1]] -= 1;
  if (record[list[right]] === 0) {
    sum += 1;
  }
  record[list[right]] += 1;
  max = Math.max(max, sum);
}

console.log(max);
