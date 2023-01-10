const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());

const board = input.map((row) => row.split(" ").map(Number));
const dpBoard = new Array(N).fill(0).map(() => new Array(N).fill(0n));

dpBoard[0][0] = 1n;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (i === N - 1 && j === N - 1) console.log(dpBoard[i][j].toString());
    const jump = board[i][j];
    const acc = dpBoard[i][j];
    if (i + jump < N) dpBoard[i + jump][j] += acc;
    if (j + jump < N) dpBoard[i][j + jump] += acc;
  }
}
