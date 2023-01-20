const [N, ...list] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const result = list.reduce(
  (prev, cur, index) => {
    if (prev.sum < 0) {
      return { sum: cur, max: Math.max(prev.max, cur) };
    } else {
      return { sum: prev.sum + cur, max: Math.max(prev.max, prev.sum + cur) };
    }
  },
  { sum: 0, max: -2000 }
);

console.log(result.max);
