const fs = require("fs");
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const parent = [];
let result = 0;
let inputArr = [];

for (let i = 1; i < input[0]; i++) {
  parent[i] = i;
}

for (let i = 2; i < input.length; i = i + 3) {
  inputArr[(i - 2) / 3] = [input[i], input[i + 1], input[i + 2]];
}

inputArr.sort(function (a, b) {
  return a[2] - b[2];
});

const find = (parent, x) => {
  if (parent[x] != x) {
    parent[x] = find(parent, parent[x]);
  }
  return parent[x];
};

const union = (parent, a, b) => {
  a = find(parent, a);
  b = find(parent, b);
  if (a < b) {
    parent[b] = a;
  } else {
    parent[a] = b;
  }
};

for (let i = 0; i < inputArr.length; i++) {
  if (find(parent, inputArr[i][0]) != find(parent, inputArr[i][1])) {
    union(parent, inputArr[i][0], inputArr[i][1]);
    result = result + inputArr[i][2];
  }
}

console.log(result);
