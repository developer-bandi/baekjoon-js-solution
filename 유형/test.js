const fs = require("fs");
const [V, ...houseArr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

for (let i = 0; i < houseArr.length; i++) {
  houseArr[i] = houseArr[i].split("").map(Number);
}

let start = findStart(houseArr);
const result = [];

while (start) {
  result.push(BFS(start));
  start = findStart(houseArr);
}

function BFS(start) {
  let result = 1;
  const queue = [start];
  while (queue.length > 0) {
    const visitNum = queue.shift();
    if (visitNum[0] !== 0 && houseArr[visitNum[0] - 1][visitNum[1]] === 1) {
      queue.push([visitNum[0] - 1, visitNum[1]]);
      houseArr[visitNum[0] - 1][visitNum[1]] = 0;
      result++;
    }

    if (visitNum[1] !== 0 && houseArr[visitNum[0]][visitNum[1] - 1] === 1) {
      queue.push([visitNum[0], visitNum[1] - 1]);
      houseArr[visitNum[0]][visitNum[1] - 1] = 0;
      result++;
    }

    if (
      visitNum[0] !== Number(V) - 1 &&
      houseArr[visitNum[0] + 1][visitNum[1]] === 1
    ) {
      queue.push([visitNum[0] + 1, visitNum[1]]);
      houseArr[visitNum[0] + 1][visitNum[1]] = 0;
      result++;
    }

    if (
      visitNum[1] !== Number(V) - 1 &&
      houseArr[visitNum[0]][visitNum[1] + 1] === 1
    ) {
      queue.push([visitNum[0], visitNum[1] + 1]);
      houseArr[visitNum[0]][visitNum[1] + 1] = 0;
      result++;
    }
  }
  return result;
}

function findStart(arr) {
  for (let i = 0; i < arr.length; i++) {
    const index = arr[i].indexOf(1);
    if (index !== -1) {
      arr[i][index] = 0;
      return [i, index];
    }
  }
  return false;
}
result.sort(function (a, b) {
  return a - b;
});
console.log(result.length);
console.log(result.join("\n"));
