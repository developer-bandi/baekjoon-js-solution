const [N, M, ...numbers] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

numbers.unshift(0);
const count = new Array(1000).fill(0);
let result = 0;
for (let i = 1; i < numbers.length; i++) {
  numbers[i] = (numbers[i] + numbers[i - 1]) % M;
  if (numbers[i] === 0) result++;
  result += count[numbers[i]];
  count[numbers[i]] += 1;
}

console.log(result);
