const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const board = input.map((row) => row.split(" ").map(Number));
const dp = new Array(N).fill(0).map(() => new Array(M).fill(0));
const newInput = input
  .map((row, x) => row.split(" ").map((num, y) => [Number(num), x, y]))
  .flat()
  .sort((a, b) => b[0] - a[0]);

dp[0][0] = 1;

for (let i = 0; i < newInput.length; i++) {
  const [value, x, y] = newInput[i];
  for (let j = 0; j < 4; j++) {
    const cur = [x + dir[j][0], y + dir[j][1]];
    if (
      cur[0] >= 0 &&
      cur[1] >= 0 &&
      cur[0] < N &&
      cur[1] < M &&
      board[cur[0]][cur[1]] < value
    ) {
      dp[cur[0]][cur[1]] += dp[x][y];
    }
  }
}

console.log(dp[N - 1][M - 1]);
