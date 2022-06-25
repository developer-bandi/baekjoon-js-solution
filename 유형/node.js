const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const BChess = [];
const WChess = [];
const width = input[0].split(" ").map(Number)[1];
const height = input[0].split(" ").map(Number)[0];
input.splice(0, 1);
let result = Infinity;
for (let i = 0; i < height; i++) {
  BChess[i] = new Array(width).fill(0);
  WChess[i] = new Array(width).fill(0);
}

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (i == 0 || i % 2 == 0) {
      if (j == 0 || j % 2 == 0) {
        if (input[i][j] == "B") WChess[i][j] = 1;
        if (input[i][j] == "W") BChess[i][j] = 1;
      } else {
        if (input[i][j] == "W") WChess[i][j] = 1;
        if (input[i][j] == "B") BChess[i][j] = 1;
      }
    } else {
      if (j == 0 || j % 2 == 0) {
        if (input[i][j] == "W") WChess[i][j] = 1;
        if (input[i][j] == "B") BChess[i][j] = 1;
      } else {
        if (input[i][j] == "W") BChess[i][j] = 1;
        if (input[i][j] == "B") WChess[i][j] = 1;
      }
    }
  }
}

for (let i = 0; i < width - 7; i++) {
  for (let j = 0; j < height - 7; j++) {
    const count = WChess.slice(j, j + 8)
      .map((data) => {
        return data.slice(i, i + 8).reduce((a, b) => a + b);
      })
      .reduce((a, b) => a + b);
    if (count < result) {
      result = count;
    }
  }
}

for (let i = 0; i < width - 7; i++) {
  for (let j = 0; j < height - 7; j++) {
    const count = BChess.slice(j, j + 8)
      .map((data) => {
        return data.slice(i, i + 8).reduce((a, b) => a + b);
      })
      .reduce((a, b) => a + b);
    if (count < result) {
      result = count;
    }
  }
}
console.log(result);
