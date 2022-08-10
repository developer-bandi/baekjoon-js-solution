const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let searchStart = 0;
let count = 0;
while (true) {
  if (input[0].indexOf(input[1], searchStart) !== -1) {
    count++;
    searchStart = input[0].indexOf(input[1], searchStart) + input[1].length;
  } else {
    break;
  }
}

console.log(count);
