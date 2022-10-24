const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map((data, index) => {
    if (index === 0) return BigInt(data) - 1n;
    return BigInt(data);
  });

const saved = [0n, 1n];
for (let i = 2n; i < 64n; i = i + 1n) {
  saved[i] = saved[i - 1n] + (2n ** (i - 1n) * (i - 1n)) / 2n + 2n ** (i - 1n);
}
const result = [];
const sum = (target) => {
  if (target === 0n) return 0n;
  if (target === 1n) return 1n;
  const binary = target.toString(2);
  const decimal = target % 2n ** BigInt(binary.length - 1);
  return saved[binary.length - 1] + sum(decimal) + decimal + 1n;
};
for (let i = 0; i < input.length; i++) {
  result[i] = sum(input[i]);
}

console.log((result[1] - result[0]).toString());
