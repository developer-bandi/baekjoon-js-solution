const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const lengthArr = input[1].split(" ").map(BigInt);
const priceArr = input[2].split(" ").map(BigInt);

for (let i = 0; i < priceArr.length; i++) {
  if (i === 0) {
    continue;
  } else {
    if (priceArr[i] > priceArr[i - 1]) {
      priceArr[i] = priceArr[i - 1];
    }
  }
}

console.log(
  lengthArr
    .reduce((prev, curent, index) => {
      return prev + curent * priceArr[index];
    }, 0n)
    .toString()
);
