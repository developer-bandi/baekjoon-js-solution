const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const stack = [1];
let result = ["+"];
let addNumber = 2;
out: for (let i = 1; i < input.length; i++) {
  while (true) {
    if (stack[stack.length - 1] === input[i]) {
      stack.pop();
      result.push("-");
      break;
    } else if (stack[stack.length - 1] > input[i]) {
      stack.pop();
      result.push("-");
    } else {
      if (addNumber > input[i]) {
        result = "NO";
        break out;
      }
      stack.push(addNumber++);
      result.push("+");
    }
  }
}
if (result === "NO") {
  console.log("NO");
} else {
  console.log(result.join("\n"));
}
