const fs = require("fs");
const [N, ...board] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [height, width] = N.split(" ").map(Number);
for (let i = 0; i < board.length; i++) {
  board[i] = board[i].split(" ").map(Number);
}
const dpArr = new Array(height).fill(0).map(() => {
  return new Array(width).fill(0);
});
dpArr[0][0] = board[0][0];
out: for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (i === height - 1 && j === width - 1) break out;
    if (i + 1 < height) {
      dpArr[i + 1][j] = Math.max(
        dpArr[i][j] + board[i + 1][j],
        dpArr[i + 1][j]
      );
    }
    if (j + 1 < width) {
      dpArr[i][j + 1] = Math.max(
        dpArr[i][j] + board[i][j + 1],
        dpArr[i][j + 1]
      );
    }
    if (i + 1 < height && j + 1 < width) {
      dpArr[i + 1][j + 1] = Math.max(
        dpArr[i][j] + board[i + 1][j + 1],
        dpArr[i + 1][j + 1]
      );
    }
  }
}
console.log(dpArr[height - 1][width - 1]);
