const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
input.shift();
let queue = [[]];
const visited = [];
let result = -1;
const move = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
for (let i = 0; i < input.length; i++) {
  const row = input[i].split("");
  for (let j = 0; j < row.length; j++) {
    if (row[j] === "B") {
      queue[0][0] = i;
      queue[0][1] = j;
      row[j] === ".";
    }
    if (row[j] === "R") {
      queue[0][2] = i;
      queue[0][3] = j;
      row[j] === ".";
    }
  }
  input[i] = row;
}

out: for (let i = 0; i < 10; i++) {
  const temptQueue = [];
  for (let j = 0; j < queue.length; j++) {
    for (let k = 0; k < 4; k++) {
      const tempt = [];
      const moveCount = [];
      let hole = [];
      for (let h = 1; h < 11; h++) {
        if (
          input[queue[j][0] + move[k][0] * h][queue[j][1] + move[k][1] * h] ===
          "#"
        ) {
          tempt.push(queue[j][0] + move[k][0] * (h - 1));
          tempt.push(queue[j][1] + move[k][1] * (h - 1));
          moveCount.push(h);
          break;
        }
        if (
          input[queue[j][0] + move[k][0] * h][queue[j][1] + move[k][1] * h] ===
          "O"
        ) {
          hole[0] = 0;
          break;
        }
      }
      for (let h = 1; h < 11; h++) {
        if (
          input[queue[j][2] + move[k][0] * h][queue[j][3] + move[k][1] * h] ===
          "#"
        ) {
          tempt.push(queue[j][2] + move[k][0] * (h - 1));
          tempt.push(queue[j][3] + move[k][1] * (h - 1));
          moveCount.push(h);
          break;
        }
        if (
          input[queue[j][2] + move[k][0] * h][queue[j][3] + move[k][1] * h] ===
          "O"
        ) {
          hole[1] = 0;
          break;
        }
      }

      if (hole[0] !== 0 && hole[1] === 0) {
        result = i + 1;
        break out;
      }
      if (
        (hole[0] === 0 && hole[1] === 0) ||
        (hole[0] === 0 && hole[1] !== 0)
      ) {
        continue;
      }
      if (tempt[0] === tempt[2] && tempt[1] === tempt[3]) {
        if (moveCount[0] > moveCount[1]) {
          tempt[0] -= move[k][0];
          tempt[1] -= move[k][1];
        } else {
          tempt[2] -= move[k][0];
          tempt[3] -= move[k][1];
        }
      }
      const position = tempt.join(" ");
      if (visited.indexOf(position) === -1) {
        temptQueue.push(tempt);
        visited.push(position);
      }
    }
  }
  queue = temptQueue;
}
console.log(result);
