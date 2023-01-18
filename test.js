const [N, M, ...list] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

let start = 0;
let end = N - 1;
let count = 0;
list.sort((a, b) => a - b);

while (start < end) {
  const sum = list[start] + list[end];
  if (sum === M) {
    start += 1;
    end -= 1;
    count += 1;
  } else if (sum > M) {
    end -= 1;
  } else {
    start += 1;
  }
}

console.log(count);
