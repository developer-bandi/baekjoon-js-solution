const [T, ...testCases] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let start = 0;
let result = [];
const dir = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
for (let i = 0; i < Number(T); i++) {
  const [M, N, K] = testCases[start].split(" ").map(Number);
  const map = new Array(N).fill(0).map(() => new Array(M).fill(0));
  let count = 0;
  for (let j = start + 1; j <= start + K; j++) {
    const [Y, X] = testCases[j].split(" ").map(Number);
    map[X][Y] = 1;
  }
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (map[j][k] === 1) {
        count++;
        map[j][k] = 0;
        const queue = [[j, k]];
        while (queue.length) {
          const [x, y] = queue.shift();
          for (let h = 0; h < 4; h++) {
            const cur = [x + dir[h][0], y + dir[h][1]];
            if (
              cur[0] >= 0 &&
              cur[1] >= 0 &&
              cur[0] < N &&
              cur[1] < M &&
              map[cur[0]][cur[1]] === 1
            ) {
              queue.push(cur);
              map[cur[0]][cur[1]] = 0;
            }
          }
        }
      }
    }
  }
  result.push(count);
  start += K + 1;
}

console.log(result.join("\n"));
