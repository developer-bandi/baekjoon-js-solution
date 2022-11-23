const [[yMax, xMax], ...board] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, index) => row.split(index ? "" : " ").map(Number));

const queue = [[0, 0, 1]];
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

board[0][0] = 0;

while (queue.length) {
  const [x, y, dis] = queue.shift();

  for (let i = 0; i < 4; i++) {
    const xPos = x + dir[i][0];
    const yPos = y + dir[i][1];

    if (0 <= xPos && 0 <= yPos && xPos < xMax && yPos < yMax) {
      if (board[yPos][xPos] === 1) {
        board[yPos][xPos] = dis + 1;
        queue.push([xPos, yPos, dis + 1]);
      }
    }
  }
}

console.log(board[yMax - 1][xMax - 1]);
