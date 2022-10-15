const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [height, width] = input.shift().split(" ").map(Number);
let [start, end, direction] = input.shift().split(" ").map(Number);
let result = 0;
const move = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split(" ").map(Number);
}

out: while (true) {
  if (input[start][end] === 0) {
    result++;
    input[start][end] = 2;
  }
  let roundtime = 0;
  while (true) {
    const left = direction === 0 ? 3 : direction - 1;
    if (input[start + move[left][0]][end + move[left][1]] === 0) {
      direction = left;
      start += move[left][0];
      end += move[left][1];
      break;
    } else if (roundtime === 4) {
      const back = direction % 2 === 0 ? 2 - direction : 4 - direction;
      start += move[back][0];
      end += move[back][1];
      if (input[start][end] === 1) {
        break out;
      }
      roundtime = 0;
    } else if (input[start + move[left][0]][end + move[left][1]] !== 0) {
      direction = left;
      roundtime++;
    }
  }
}
console.log(result);
