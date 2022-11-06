# 1. 아이디어

노드를 선택할때 이전항을 해결해야하므로, 순서가 존재한다. 따라서 기본적으로 위상정렬을 이용하여 해결한다. 이때, 진입점인 0인 노드를 순차적으로 해결하면서, 이전 단계들중 가장 건설시간이 긴 노드를 기준으로 해당노드의 건설을 시작해야하기때문에, dp를 이용하여, 최대 건설시간을 관리하면서, 위상정렬을 수행하다가 타겟 건물이 나오면 출력하면 된다.

# 2. 소스코드

```javascript
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const [N, M] = input[0];
function push(heap, element) {
  heap.push(element);

  let index = heap.length - 1;

  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    if (heap[index] < heap[parent]) {
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
  if (heap.length === 1) return heap.pop();
  const result = heap[0];
  heap[0] = heap.pop();

  let index = 0;

  while (index * 2 + 1 < heap.length) {
    let next = index;
    const left = index * 2 + 1;
    const right = index * 2 + 2;

    if (heap[left] < heap[next]) next = left;

    if (right < heap.length && heap[right] < heap[next]) next = right;

    if (index === next) break;

    const temporary = heap[index];

    heap[index] = heap[next];
    heap[next] = temporary;
    index = next;
  }
  return result;
}

const queue = [];
const result = [];
const entrys = new Array(N + 1).fill(0);
const outputs = new Array(N + 1).fill(0).map(() => []);
for (let i = 1; i < input.length; i++) {
  outputs[input[i][0]].push(input[i][1]);
  entrys[input[i][1]]++;
}

for (let i = 1; i < entrys.length; i++) {
  if (entrys[i] === 0) {
    push(queue, i);
  }
}

while (queue.length > 0) {
  const target = pop(queue);
  outputs[target].forEach((num) => {
    if (--entrys[num] === 0) push(queue, num);
  });
  result.push(target);
}

console.log(result.join(" "));
```
