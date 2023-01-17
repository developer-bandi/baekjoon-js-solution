const input = require("fs").readFileSync("/dev/stdin").toString().trim();
const MODULE = 15746;

const { twoFormer } = new Array(input - 1).fill(0).reduce(
  ({ prev, twoFormer }) => ({
    prev: (prev + twoFormer) % MODULE,
    twoFormer: prev,
  }),
  { prev: 2, twoFormer: 1 }
);

console.log(twoFormer);
