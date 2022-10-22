const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [xMax, yMax, time] = input[0].split(" ").map(Number);
let board = [];
const cleaner = [];
const move = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
for (let i = 1; i < input.length; i++) {
  board[i - 1] = input[i].split(" ").map(Number);
  if (board[i - 1][0] === -1) {
    cleaner.push([i - 1, 0]);
  }
}

for (let i = 0; i < time; i++) {
  const newBoard = new Array(xMax).fill(0).map(() => new Array(yMax).fill(0));
  for (let j = 0; j < xMax; j++) {
    for (let k = 0; k < yMax; k++) {
      if (board[j][k] >= 5) {
        let count = 0;
        for (let h = 0; h < 4; h++) {
          const newP = [j + move[h][0], k + move[h][1]];
          if (
            newP[0] >= 0 &&
            newP[1] >= 0 &&
            newP[0] < xMax &&
            newP[1] < yMax &&
            board[newP[0]][newP[1]] !== -1
          ) {
            count++;
            newBoard[newP[0]][newP[1]] += Math.floor(board[j][k] / 5);
          }
        }
        newBoard[j][k] += board[j][k] - Math.floor(board[j][k] / 5) * count;
      } else {
        newBoard[j][k] += board[j][k];
      }
    }
  }
  {
    const directionSet = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    let lastP = [cleaner[0][0] - 1, 0];
    let nowP = [cleaner[0][0] - 2, 0];
    let direction = 0;
    while (direction < 4) {
      if (newBoard[nowP[0]][nowP[1]] === -1) {
        newBoard[lastP[0]][lastP[1]] = 0;
        break;
      }
      newBoard[lastP[0]][lastP[1]] = newBoard[nowP[0]][nowP[1]];
      if (
        nowP[0] + directionSet[direction][0] >= 0 &&
        nowP[0] + directionSet[direction][0] <= cleaner[0][0] &&
        nowP[1] + directionSet[direction][1] >= 0 &&
        nowP[1] + directionSet[direction][1] < yMax
      ) {
        lastP = nowP;
        nowP = [
          nowP[0] + directionSet[direction][0],
          nowP[1] + directionSet[direction][1],
        ];
      } else {
        direction++;
      }
    }
  }
  {
    const directionSet = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    let lastP = [cleaner[1][0] + 1, 0];
    let nowP = [cleaner[1][0] + 2, 0];
    let direction = 0;
    while (direction < 4) {
      if (newBoard[nowP[0]][nowP[1]] === -1) {
        newBoard[lastP[0]][lastP[1]] = 0;
        break;
      }
      newBoard[lastP[0]][lastP[1]] = newBoard[nowP[0]][nowP[1]];
      if (
        nowP[0] + directionSet[direction][0] >= cleaner[1][0] &&
        nowP[0] + directionSet[direction][0] < xMax &&
        nowP[1] + directionSet[direction][1] >= 0 &&
        nowP[1] + directionSet[direction][1] < yMax
      ) {
        lastP = nowP;
        nowP = [
          nowP[0] + directionSet[direction][0],
          nowP[1] + directionSet[direction][1],
        ];
      } else {
        direction++;
      }
    }
  }
  board = newBoard;
}
console.log(
  board
    .map((row) => {
      return row.reduce((prev, cur) => prev + cur, 0);
    })
    .reduce((prev, cur) => prev + cur, 0) + 2
);
