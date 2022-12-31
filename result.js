const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const numbers = input[1].split("").map(Number);

const stack = [];
let popCount = 0;
for (let i = 0; i < numbers.length; i++) {
  while (stack[stack.length - 1] < numbers[i] && popCount !== K) {
    stack.pop();
    popCount += 1;
  }
  stack.push(numbers[i]);
}

while (popCount !== K) {
  stack.pop();
  popCount += 1;
}

console.log(stack.join(""));
