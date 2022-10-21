const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function makeSum(n) {
  let result = "";
  for (let i = 2; i <= n; i++) {
    result += i;
  }

  return Number(result);
}

for (let i = 1; i < input.length; i++) {
  let sum = makeSum(input[i]);
  let result = [["1", 1, 1]];
  for (let j = 2; j <= input[i]; j++) {
    sum = sum % (10 ** input[i] - j);
    const temp = [];
    for (let k = 0; k < result.length; k++) {
      if (Math.abs(result[k][1] + j) <= sum) {
        temp.push([result[k][0] + `+${j}`, result[k][1] + j, +j]);
      }
      if (Math.abs(result[k][1] + j) <= sum) {
        temp.push([result[k][0] + `-${j}`, result[k][1] - j, -j]);
      }
      if (result[k][2] < 0) {
        if (
          Math.abs(result[k][1] - result[k][2] + result[k][2] * 10 - j) <= sum
        ) {
          temp.push([
            result[k][0] + ` ${j}`,
            result[k][1] - result[k][2] + result[k][2] * 10 - j,
            result[k][2] * 10 - j,
          ]);
        }
      }
      if (result[k][2] > 0) {
        if (
          Math.abs(result[k][1] - result[k][2] + result[k][2] * 10 + j) <= sum
        ) {
          temp.push([
            result[k][0] + ` ${j}`,
            result[k][1] - result[k][2] + result[k][2] * 10 + j,
            result[k][2] * 10 + j,
          ]);
        }
      }
    }
    result = temp;
  }
  const noSort = result
    .filter((data) => {
      if (data[1] === 0) {
        return true;
      } else {
        return false;
      }
    })
    .map((data) => {
      return data[0];
    });

  noSort.sort();
  if (i !== input.length - 1) {
    noSort.push("");
  }
  console.log(noSort.join("\n"));
}
