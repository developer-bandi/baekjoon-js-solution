const [N, ...K] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

const { minus, plus } = K.reduce(
  (prev, cur) => {
    if (cur < 0) {
      prev.minus.push(cur);
    } else {
      prev.plus.push(cur);
    }
    return {
      ...prev,
    };
  },
  { minus: [], plus: [] }
);
minus.sort((a, b) => b - a);
plus.sort((a, b) => a - b);

if (minus.length === 0) {
  console.log(plus[0], plus[1]);
} else if (plus.length === 0) {
  console.log(minus[1], minus[0]);
} else {
  let minusPointer = 0;
  let plusPointer = 0;
  let result = Math.abs(minus[0] + plus[0]);
  let resultPointer = [minus[0], plus[0]];
  while (true) {
    if (Math.abs(minus[minusPointer]) < plus[plusPointer]) {
      minusPointer++;
    } else if (Math.abs(minus[minusPointer]) > plus[plusPointer]) {
      plusPointer++;
    } else {
      break;
    }
    if (minusPointer === minus.length || plusPointer === plus.length) break;
    if (result > Math.abs(minus[minusPointer] + plus[plusPointer])) {
      result = Math.abs(minus[minusPointer] + plus[plusPointer]);
      resultPointer = [minus[minusPointer], plus[plusPointer]];
    }
  }
  const a = [
    {
      value: minus.length === 1 ? Infinity : Math.abs(minus[0] + minus[1]),
      pointer: [minus[0], minus[1]],
    },
    {
      value: plus.length === 1 ? Infinity : plus[0] + plus[1],
      pointer: [plus[0], plus[1]],
    },
    { value: result, pointer: resultPointer },
  ];

  a.sort((a, b) => {
    return a.value - b.value;
  });
  console.log(a[0].pointer.join(" "));
}
