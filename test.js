const [N, ...list] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const result = list
  .reduce(
    ([zero, one, two], cur) => [
      Math.max(zero, one, two),
      zero + cur,
      one + cur,
    ],
    [0, 0, 0]
  )
  .reduce((prev, cur) => (prev > cur ? prev : cur), 0);

console.log(result);
