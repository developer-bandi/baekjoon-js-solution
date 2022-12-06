let [M, ...input] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let numbers = input.map((row) => row.split(""));
const newNumbers = input.map((row) => row.split(""));
const T = Number(M);
const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function findArea() {
  let count = 0;
  for (let i = 0; i < T; i++) {
    for (let j = 0; j < T; j++) {
      if (numbers[i][j] !== "V") {
        bfs([i, j], numbers[i][j]);
        count++;
      }
    }
  }
  return count;
}

function setNewNumber() {
  numbers = newNumbers;

  for (let i = 0; i < T; i++) {
    for (let j = 0; j < T; j++) {
      if (numbers[i][j] === "R") numbers[i][j] = "G";
    }
  }
}

function bfs(start, char) {
  const queue = [start];
  numbers[start[0]][start[1]] = "V";
  while (queue.length) {
    const cur = queue.shift();
    for (let i = 0; i < 4; i++) {
      const moved = [cur[0] + dir[i][0], cur[1] + dir[i][1]];
      if (
        moved[0] >= 0 &&
        moved[1] >= 0 &&
        moved[0] < T &&
        moved[1] < T &&
        numbers[moved[0]][moved[1]] === char
      ) {
        numbers[moved[0]][moved[1]] = "V";
        queue.push(moved);
      }
    }
  }
}
const first = findArea();
setNewNumber();
const second = findArea();
console.log(first, second);
