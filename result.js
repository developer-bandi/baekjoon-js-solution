const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const results = [];

for (let i = 2; i < input.length; i = i + 2) {
  let diff = 0;
  const row = input[i]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const woodList = [row[row.length - 1]];
  for (let j = row.length - 2; j >= 0; j = j - 2) {
    const fisrt = row[j - 1] || woodList[0];
    const last = row[j];
    diff = Math.max(
      diff,
      woodList[0] - fisrt,
      woodList[woodList.length - 1] - last
    );
    woodList.unshift(fisrt);
    woodList.push(last);
  }
  results.push(diff);
}

console.log(results.join("\n"));
