const arr = [];

for (let i = 1; i < 9; i++) {
  for (let j = 1; j < 9; j++) {
    arr.push(i * j);
  }
}

arr.sort(function (a, b) {
  return a - b;
});

console.log(arr);
