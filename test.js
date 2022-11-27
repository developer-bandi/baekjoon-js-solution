const [T, ...testCases] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const result = [];
for (let i = 0; i < testCases.length; i = i + 2) {
  const prices = testCases[i + 1].split(" ").map(Number).reverse();
  let max = prices[0];
  let sum = 0;

  for (let j = 1; j < prices.length; j++) {
    if (prices[j] > max) max = prices[j];
    if (prices[j] <= max) sum += max - prices[j];
  }
  result.push(sum);
}

console.log(result.join("\n"));
