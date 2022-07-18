const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
let tempArr = [];
let result = "";
let braket = false;
for (let i = 0; i < input.length; i++) {
  if (input[i] === "<") {
    braket = true;
    tempArr.reverse();
    result += tempArr.join("");
    tempArr = ["<"];
  } else if (input[i] === ">") {
    braket = false;
    tempArr.push(">");
    result += tempArr.join("");
    tempArr = [];
  } else if (input[i] === " ") {
    if (braket) {
      tempArr.push(" ");
    } else {
      tempArr.reverse();
      tempArr.push(" ");
      result += tempArr.join("");
      tempArr = [];
    }
  } else {
    tempArr.push(input[i]);
  }
}
if (tempArr.length > 0) {
  tempArr.reverse();
  result += tempArr.join("");
}

console.log(result);
