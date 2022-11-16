const [N, ...cards] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const dp = [...cards];
for (let i = 0; i < cards.length; i++) {
  dp[i] = Math.max(
    ...dp.slice(0, i).map((v, index, array) => v + array[i - index - 1]),
    dp[i]
  );
}
console.log(dp[N - 1]);
