const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const checkArr = [];
let i = 0;
let storedArr = [input[0]];
if (input[0] == 1) {
  console.log(0);
} else {
  out: while (true) {
    let length = storedArr.length;
    const tempArr = [];
    i++;

    for (let j = 0; j < length; j++) {
      if (storedArr[j] % 3 == 0) {
        if (storedArr[j] / 3 == 1) {
          break out;
        }
        if (!checkArr[storedArr[j] / 3]) {
          tempArr.push(storedArr[j] / 3);
          checkArr[storedArr[j] / 3] = true;
        }
      }
      if (storedArr[j] % 2 == 0) {
        if (storedArr[j] / 2 == 1) {
          break out;
        }
        if (!checkArr[storedArr[j] / 2]) {
          tempArr.push(storedArr[j] / 2);
          checkArr[storedArr[j] / 2] = true;
        }
      }
      if (storedArr[j] - 1 == 1) {
        break out;
      }
      if (!checkArr[storedArr[j] - 1]) {
        tempArr.push(storedArr[j] - 1);
        checkArr[storedArr[j] - 1] = true;
      }
    }
    storedArr = tempArr;
  }
  console.log(i);
}
