const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const pascal = new Array(30).fill(0).map(() => []);

for (let i = 0; i < pascal.length; i++) {
  for (let j = 0; j <= i; j++) {
    if (j === 0 || j === i) {
      pascal[i][j] = 1;
    } else {
      pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
    }
  }
}

const N = Number(input.shift());
const result = input
  .map((row) => {
    const [left, right] = row.split(" ").map(Number);
    return pascal[right][left];
  })
  .join("\n");

console.log(result);
