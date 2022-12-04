const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const numbers = input.map((row) => row.split(" ").map(Number));

const emptySpaces = [];
let wallSpace = 3;
let min = Infinity;
const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (numbers[i][j] === 0) emptySpaces.push([i, j]);
    if (numbers[i][j] === 1) wallSpace++;
  }
}

for (let i = 0; i < emptySpaces.length; i++) {
  for (let j = i + 1; j < emptySpaces.length; j++) {
    for (let k = j + 1; k < emptySpaces.length; k++) {
      const walls = [emptySpaces[i], emptySpaces[j], emptySpaces[k]];
      walls.forEach(([x, y]) => (numbers[x][y] = 1));
      min = Math.min(bfs(), min);
      walls.forEach(([x, y]) => (numbers[x][y] = 0));
    }
  }
}

function bfs() {
  let count = 0;
  const visited = new Array(N).fill(0).map(() => []);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (numbers[i][j] === 2) search([i, j]);
    }
  }

  function search(start) {
    const queue = [start];
    visited[start[0]][start[1]] = 1;
    while (queue.length) {
      const cur = queue.shift();
      for (let i = 0; i < 4; i++) {
        const moved = [cur[0] + dir[i][0], cur[1] + dir[i][1]];
        if (
          moved[0] >= 0 &&
          moved[1] >= 0 &&
          moved[0] < N &&
          moved[1] < M &&
          visited[moved[0]][moved[1]] === undefined &&
          numbers[moved[0]][moved[1]] === 0
        ) {
          queue.push(moved);
          visited[moved[0]][moved[1]] = 1;
          count += 1;
        }
      }
    }
    count += 1;
  }
  return count;
}

console.log(N * M - min - wallSpace);
