function solution(numbers) {
  function push(heap, element) {
    heap.push(element);

    let index = heap.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (heap[index][1] < heap[parent][1]) {
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

      if (heap[left][1] < heap[next][1]) next = left;

      if (right < heap.length && heap[right][1] < heap[next][1]) next = right;

      if (index === next) break;

      const temporary = heap[index];

      heap[index] = heap[next];
      heap[next] = temporary;
      index = next;
    }

    return result;
  }

  const graph = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [null, 0, null],
  ];

  const graphPosition = [
    [3, 1],
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  const upDown = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  const cross = [
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  const dickstra = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (graph[i][j] === null) continue;
      const heap = [];
      const row = [];
      push(heap, [graph[i][j], 0]);
      while (heap.length) {
        const poped = pop(heap);
        if (row[poped[0]] !== undefined) continue;
        row[poped[0]] = poped[1];

        for (let k = 0; k < 4; k++) {
          const cur = [
            graphPosition[poped[0]][0] + upDown[k][0],
            graphPosition[poped[0]][1] + upDown[k][1],
          ];
          if (
            cur[0] >= 0 &&
            cur[1] >= 0 &&
            cur[0] < 4 &&
            cur[1] < 3 &&
            graph[cur[0]][cur[1]] !== null &&
            row[graph[cur[0]][cur[1]]] === undefined
          ) {
            push(heap, [graph[cur[0]][cur[1]], poped[1] + 2]);
          }
        }
        for (let k = 0; k < 4; k++) {
          const cur = [
            graphPosition[poped[0]][0] + cross[k][0],
            graphPosition[poped[0]][1] + cross[k][1],
          ];
          if (
            cur[0] >= 0 &&
            cur[1] >= 0 &&
            cur[0] < 4 &&
            cur[1] < 3 &&
            graph[cur[0]][cur[1]] !== null &&
            row[graph[cur[0]][cur[1]]] === undefined
          ) {
            push(heap, [graph[cur[0]][cur[1]], poped[1] + 3]);
          }
        }
      }
      row[graph[i][j]] = 1;
      dickstra[graph[i][j]] = row;
    }
  }

  let dp = new Array(10).fill(0).map(() => new Array(10).fill(Infinity));
  dp[4][6] = 0;
  for (let i = 0; i < numbers.length; i++) {
    const target = Number(numbers[i]);
    const tempt = new Array(10).fill(0).map(() => new Array(10).fill(Infinity));
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        if (dp[j][k] === Infinity) continue;
        if (k !== target) {
          tempt[target][k] = Math.min(
            tempt[target][k],
            dp[j][k] + dickstra[j][target]
          );
        }
        if (j !== target) {
          tempt[j][target] = Math.min(
            tempt[j][target],
            dp[j][k] + dickstra[k][target]
          );
        }
      }
    }
    dp = tempt;
  }
  return Math.min(...dp.flat());
}
function makeInput() {
  let result = "";
  for (let i = 0; i < 100000; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

console.log(solution(makeInput()));
console.log(solution(makeInput()));
