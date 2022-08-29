const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

input.shift();
for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split("").map(Number);
}

if (input.length === 1 && input[0].length === 1) {
  console.log(1);
} else {
  function BFS() {
    let queue = [[0, 0, 0]];
    let count = 1;
    const visitedArr = new Array(input.length).fill(0).map(() => {
      return [];
    });
    visitedArr[0][0] = 0;
    while (queue.length > 0) {
      count++;
      const tempArr = [];
      for (let i = 0; i < queue.length; i++) {
        if (queue[i][0] !== 0) {
          if (input[queue[i][0] - 1][queue[i][1]] === 1 && queue[i][2] === 0) {
            if (visitedArr[queue[i][0] - 1][queue[i][1]] !== 0) {
              tempArr.push([queue[i][0] - 1, queue[i][1], 1]);
              visitedArr[queue[i][0] - 1][queue[i][1]] = 1;
            }
          } else if (input[queue[i][0] - 1][queue[i][1]] === 0) {
            if (
              visitedArr[queue[i][0] - 1][queue[i][1]] === undefined ||
              visitedArr[queue[i][0] - 1][queue[i][1]] > queue[i][2]
            ) {
              tempArr.push([queue[i][0] - 1, queue[i][1], queue[i][2]]);
              visitedArr[queue[i][0] - 1][queue[i][1]] = queue[i][2];
            }
          }
        }

        if (queue[i][1] !== input[0].length - 1) {
          if (
            queue[i][0] === input.length - 1 &&
            queue[i][1] + 1 === input[0].length - 1
          ) {
            return count;
          }
          if (input[queue[i][0]][queue[i][1] + 1] === 1 && queue[i][2] === 0) {
            if (visitedArr[queue[i][0]][queue[i][1] + 1] !== 0) {
              tempArr.push([queue[i][0], queue[i][1] + 1, 1]);
              visitedArr[queue[i][0]][queue[i][1] + 1] = 1;
            }
          } else if (input[queue[i][0]][queue[i][1] + 1] === 0) {
            if (
              visitedArr[queue[i][0]][queue[i][1] + 1] === undefined ||
              visitedArr[queue[i][0]][queue[i][1] + 1] > queue[i][2]
            ) {
              tempArr.push([queue[i][0], queue[i][1] + 1, queue[i][2]]);
              visitedArr[queue[i][0]][queue[i][1] + 1] = queue[i][2];
            }
          }
        }

        if (queue[i][0] !== input.length - 1) {
          if (
            queue[i][0] + 1 === input.length - 1 &&
            queue[i][1] === input[0].length - 1
          ) {
            return count;
          }
          if (input[queue[i][0] + 1][queue[i][1]] === 1 && queue[i][2] === 0) {
            if (visitedArr[queue[i][0] + 1][queue[i][1]] !== 0) {
              tempArr.push([queue[i][0] + 1, queue[i][1], 1]);
              visitedArr[queue[i][0] + 1][queue[i][1]] = 1;
            }
          } else if (input[queue[i][0] + 1][queue[i][1]] === 0) {
            if (
              visitedArr[queue[i][0] + 1][queue[i][1]] === undefined ||
              visitedArr[queue[i][0] + 1][queue[i][1]] > queue[i][2]
            ) {
              tempArr.push([queue[i][0] + 1, queue[i][1], queue[i][2]]);
              visitedArr[queue[i][0] + 1][queue[i][1]] = queue[i][2];
            }
          }
        }

        if (queue[i][1] !== 0) {
          if (input[queue[i][0]][queue[i][1] - 1] === 1 && queue[i][2] === 0) {
            if (visitedArr[queue[i][0]][queue[i][1] - 1] !== 0) {
              tempArr.push([queue[i][0], queue[i][1] - 1, 1]);
              visitedArr[queue[i][0]][queue[i][1] - 1] = 1;
            }
          } else if (input[queue[i][0]][queue[i][1] - 1] === 0) {
            if (
              visitedArr[queue[i][0]][queue[i][1] - 1] === undefined ||
              visitedArr[queue[i][0]][queue[i][1] - 1] > queue[i][2]
            ) {
              tempArr.push([queue[i][0], queue[i][1] - 1, queue[i][2]]);
              visitedArr[queue[i][0]][queue[i][1] - 1] = queue[i][2];
            }
          }
        }
      }
      queue = tempArr;
    }
    return -1;
  }

  console.log(BFS());
}
