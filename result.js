const [N, ...lists] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function push(heap, element) {
  heap.push(element);

  let index = heap.length - 1;

  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    if (heap[index] > heap[parent]) {
      const temporary = heap[parent];

      heap[parent] = heap[index];
      heap[index] = temporary;
      index = parent;
    } else {
      break;
    }
  }
}

function pop(heap) {
  if (heap.length === 0) return heap.pop();
  const result = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.pop();

  let index = 0;

  while (index * 2 + 1 < heap.length) {
    let next = index;
    const left = index * 2 + 1;
    const right = index * 2 + 2;

    if (heap[left] > heap[next]) next = left;

    if (right < heap.length && heap[right] > heap[next]) next = right;

    if (index === next) break;

    const temporary = heap[index];

    heap[index] = heap[next];
    heap[next] = temporary;
    index = next;
  }

  return result;
}

const universities = lists.map((row) => row.split(" ").map(Number));
const days = new Array(10001).fill(0).map(() => []);
universities.forEach(([m, d]) => days[d].push(m));

let sum = 0;
const heap = [];
for (let i = 10000; i > 0; i--) {
  days[i].forEach((m) => push(heap, m));
  if (heap.length === 0) continue;
  sum += pop(heap);
}

console.log(sum);