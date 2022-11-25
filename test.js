const [N, K, ...position] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

position.sort((a, b) => a - b);

const distance = position.map((value, index, array) => {
  if (index === N - 1) return Infinity;
  return array[index + 1] - value;
});
distance.sort((a, b) => b - a);

console.log(distance.slice(K).reduce((prev, cur) => prev + cur, 0));
