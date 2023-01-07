const N = Number(require("fs").readFileSync("/dev/stdin").toString().trim());

let i = 0;
let sum = 0;

while (sum <= N) {
  i++;
  sum = (i * (i + 1)) / 2;
}

console.log(i - 1);
