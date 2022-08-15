const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [tableLength, countLength] = input.shift().split(" ").map(Number);
const countArr = input.splice(tableLength, countLength).map((row) => {
  return row.split(" ").map(Number);
});
const table = input.map((row) => {
  return [0].concat(row.split(" ").map(Number));
});

for (let i = 0; i < table.length; i++) {
  let sum = 0;
  for (let j = 0; j < table[i].length; j++) {
    if (i === 0) {
      if (j !== 0) {
        table[i][j] += table[i][j - 1];
      }
    } else {
      sum += table[i][j];
      table[i][j] = sum + table[i - 1][j];
    }
  }
}

table.unshift(new Array(tableLength + 1).fill(0));

for (let i = 0; i < countArr.length; i++) {
  countArr[i] =
    table[countArr[i][2]][countArr[i][3]] -
    table[countArr[i][0] - 1][countArr[i][3]] -
    table[countArr[i][2]][countArr[i][1] - 1] +
    table[countArr[i][0] - 1][countArr[i][1] - 1];
}

console.log(countArr.join("\n"));
