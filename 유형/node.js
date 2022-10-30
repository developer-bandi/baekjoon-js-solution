const input = +require("fs").readFileSync("/dev/stdin").toString().trim();
const allNumber = new Array(input + 1).fill(0).map((data, index) => index);
allNumber[1] = 0;

for (let i = 2; i <= Math.floor(Math.sqrt(input)); i++) {
  for (let j = i * 2; j <= input; j = j + i) {
    allNumber[j] = 0;
  }
}

const decimal = allNumber.filter((data) => {
  if (data !== 0) {
    return true;
  }
  return false;
});
let fisrt = 0;
let last = 0;
let sum = 2;
let result = 0;
while (decimal[last] !== undefined) {
  if (sum < input) {
    last++;
    sum += decimal[last];
  } else if (sum > input) {
    sum -= decimal[fisrt];
    fisrt++;
  } else {
    last++;
    result++;
    sum += decimal[last];
  }
}

console.log(result);
