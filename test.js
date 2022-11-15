const [N, M, ...homes] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

homes.sort((a, b) => a - b);

let start = 0;
let mid = 0;
let end = homes[homes.length - 1];
let result = 0;

while (start <= end) {
  mid = Math.floor((start + end) / 2);

  let point = homes[0];
  let count = 1;

  for (let i = 1; i < homes.length; i++) {
    if (homes[i] - point >= mid) {
      point = homes[i];
      count++;
    }
  }
  if (count >= M) {
    result = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}
console.log(result);
