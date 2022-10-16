const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const wheels = [];
for (let i = 0; i < 4; i++) {
  wheels[i + 1] = input[i].split("");
}
for (let i = 5; i < input.length; i++) {
  const [target, direction] = input[i].split(" ").map(Number);
  const directions = [];
  directions[target] = direction;
  for (let j = 1; j < 4; j++) {
    if (target - j > 0) {
      if (wheels[target - j][2] === wheels[target - j + 1][6]) {
        break;
      } else {
        directions[target - j] = directions[target - j + 1] * -1;
      }
    }
  }
  for (let j = 1; j < 4; j++) {
    if (target + j < 5) {
      if (wheels[target + j][6] === wheels[target + j - 1][2]) {
        break;
      } else {
        directions[target + j] = directions[target + j - 1] * -1;
      }
    }
  }
  for (let j = 1; j < 5; j++) {
    if (directions[j] === 1) {
      wheels[j].unshift(wheels[j].pop());
    } else if (directions[j] === -1) {
      wheels[j].push(wheels[j].shift());
    }
  }
}
const value = [1, 2, 4, 8];
wheels.shift();
console.log(
  wheels.reduce((prev, cur, index) => {
    return prev + cur[0] * value[index];
  }, 0)
);
