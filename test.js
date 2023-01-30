const [N, K] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const MOD = 1000000000;
let dp = new Array(N + 1).fill(1);

for (let i = 0; i < K - 1; i++) {
  const tempt = new Array(N + 1).fill(0);
  for (let j = 0; j <= N; j++) {
    for (let k = 0; k <= N - j; k++) {
      tempt[j + k] = (tempt[j + k] + dp[j]) % MOD;
    }
  }
  dp = tempt;
}
console.log(dp[N]);
