const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let result = 1;
input.splice(0, 1);
const timeArr = input
  .map((time) => {
    return time.split(" ").map(Number);
  })
  .sort(function (a, b) {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });
let lastTime = timeArr[0][1];
let i = 1;

while (true) {
  let flag = true;
  for (let j = i; j < timeArr.length; j++) {
    if (timeArr[j][0] >= lastTime) {
      flag = false;
      result++;
      i = j + 1;
      lastTime = timeArr[j][1];
      break;
    }
  }
  if (flag) {
    break;
  }
}

console.log(result);
