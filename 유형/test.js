const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);
const sixPrice = [];
const onePrice = [];

for (let i = 2; i < input.length; i++) {
  if (i % 2 == 0) {
    sixPrice.push(input[i]);
  } else {
    onePrice.push(input[i]);
  }
}

const minSixPrice = Math.min(...sixPrice);
const minOnePrice = Math.min(...onePrice);

const allSixPrice = (Math.floor(input[0] / 6) + 1) * minSixPrice;
const allOnePrice = minOnePrice * input[0];
const mixPrice =
  Math.floor(input[0] / 6) * minSixPrice + (input[0] % 6) * minOnePrice;

console.log(Math.min(allSixPrice, allOnePrice, mixPrice));
