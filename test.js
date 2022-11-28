const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let start = 0;
const result = [];
const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
];

while (true) {
  const [y, x] = input[start].split(" ").map(Number);
  if (x === 0 && y === 0) break;
  const board = [];
  let islandCount = 0;
  for (let i = 1; i <= x; i++) {
    board.push(input[start + i].split(" "));
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === "1") {
        bfs(board, [i, j]);
        islandCount++;
      }
    }
  }
  result.push(islandCount);
  start += x + 1;
}

function bfs(board, s) {
  let queue = [s];
  while (queue.length) {
    const tempt = [];
    for (let i = 0; i < queue.length; i++) {
      for (let j = 0; j < 8; j++) {
        const cur = [queue[i][0] + dir[j][0], queue[i][1] + dir[j][1]];
        if (
          cur[0] >= 0 &&
          cur[1] >= 0 &&
          cur[0] < board.length &&
          cur[1] < board[0].length &&
          board[cur[0]][cur[1]] === "1"
        ) {
          tempt.push(cur);
          board[cur[0]][cur[1]] = "0";
        }
      }
    }
    queue = tempt;
  }
}

console.log(result.join("\n"));
