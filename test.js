const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const numbers = input.map((row) => row.split(" ").map(Number));
const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let time = 0;
while (true) {
  time += 1;
  let queue = [[0, 0]];
  const deleted = [];
  const visited = new Array(N).fill(0).map(() => new Array(M).fill(0));

  while (queue.length) {
    const tempt = [];
    for (let i = 0; i < queue.length; i++) {
      for (let j = 0; j < dirs.length; j++) {
        const cur = [queue[i][0] + dirs[j][0], queue[i][1] + dirs[j][1]];
        if (cur[0] >= 0 && cur[1] >= 0 && cur[0] < N && cur[1] < M) {
          if (numbers[cur[0]][cur[1]]) {
            if (visited[cur[0]][cur[1]] < 2) {
              visited[cur[0]][cur[1]] += 1;
              if (visited[cur[0]][cur[1]] === 2) deleted.push(cur);
            }
          } else {
            if (!visited[cur[0]][cur[1]]) {
              visited[cur[0]][cur[1]] = 1;
              tempt.push(cur);
            }
          }
        }
      }
    }
    queue = tempt;
  }
  if (deleted.length === 0) break;
  deleted.forEach(([x, y]) => {
    numbers[x][y] = 0;
  });
}

console.log(time - 1);
