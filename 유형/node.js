const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let start = 1;
const result = [];
for (let i = 0; i < Number(input[0]); i++) {
  const [count, order] = input[start].split(" ").map(Number);
  const makedTime = input[start + 1].split(" ").map(Number);
  const newTime = new Array(count + 1).fill(0);
  const target = Number(input[start + 2 + order]);
  const queue = [];
  const entrys = new Array(count + 1).fill(0);
  const outputs = new Array(count + 1).fill(0).map(() => []);
  for (let i = start + 2; i < order + start + 2; i++) {
    const row = input[i].split(" ").map(Number);
    outputs[row[0]].push(row[1]);
    entrys[row[1]]++;
  }
  for (let i = 1; i < entrys.length; i++) {
    if (entrys[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const cur = queue.pop();
    if (cur === target) {
      result.push(makedTime[cur - 1]);
      break;
    }
    outputs[cur].forEach((deleted) => {
      if (--entrys[deleted] === 0) {
        queue.push(deleted);
        makedTime[deleted - 1] += Math.max(
          makedTime[cur - 1],
          newTime[deleted - 1]
        );
      } else {
        newTime[deleted - 1] = Math.max(
          newTime[deleted - 1],
          makedTime[cur - 1]
        );
      }
    });
  }
  start = start + 3 + order;
}

console.log(result.join("\n"));
