const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const length = +input.shift();
let [size, count] = [2, 0];
let [startX, startY] = [];
let time = 0;
const move = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];
for (let i = 0; i < input.length; i++) {
  const row = input[i].split(" ").map(Number);
  for (let j = 0; j < row.length; j++) {
    if (startX !== undefined) break;
    if (row[j] === 9) {
      startX = i;
      startY = j;
      row[j] = 0;
      break;
    }
  }
  input[i] = row;
}

out: while (true) {
  let queue = [[startX, startY]];
  const visited = new Array(length).fill(0).map(() => []);
  visited[startX][startY] = 0;
  let moveCount = 0;
  let result = [Infinity, Infinity];
  while (true) {
    const tempt = [];
    for (let i = 0; i < queue.length; i++) {
      for (let j = 0; j < move.length; j++) {
        const movePosition = [
          queue[i][0] + move[j][0],
          queue[i][1] + move[j][1],
        ];
        if (
          movePosition[0] >= 0 &&
          movePosition[1] >= 0 &&
          movePosition[0] < length &&
          movePosition[1] < length &&
          input[movePosition[0]][movePosition[1]] <= size &&
          visited[movePosition[0]][movePosition[1]] !== 0
        ) {
          tempt.push(movePosition);
          visited[movePosition[0]][movePosition[1]] = 0;
          if (
            input[movePosition[0]][movePosition[1]] < size &&
            input[movePosition[0]][movePosition[1]] !== 0
          ) {
            if (result[0] > movePosition[0]) {
              result = movePosition;
            } else if (result[0] === movePosition[0]) {
              if (result[1] > movePosition[1]) {
                result = movePosition;
              }
            }
          }
        }
      }
    }
    if (result[0] !== Infinity) {
      input[result[0]][result[1]] = 0;
      time += moveCount + 1;
      startX = result[0];
      startY = result[1];
      if (count + 1 === size) {
        size += 1;
        count = 0;
      } else {
        count += 1;
      }
      break;
    }
    queue = tempt;
    moveCount++;
    if (tempt.length === 0) {
      break out;
    }
  }
}
console.log(time);
