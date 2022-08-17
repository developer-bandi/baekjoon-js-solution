# 1. 문제

https://www.acmicpc.net/problem/2178

# 2. 아이디어

입력값을 받을때, 그래프를 형성하도록 정리해야하는데, js에는 연결리스트가 없지만, 연결리스트와 유사하게, 정점의 갯수만큼 배열을 만들고, 해당 배열에 정점과 연결된 다른 정점을 넣었다. 이때 같은 선택지이면 더작은값을 선택해야하므로, 오름차순으로 정렬하였다.

DFS의 경우, 스택을 활용한다. 첫 노드를 방문처리한뒤, 스택에 삽입한다. 이 노드에 연결된 노드중 방문되지 않은 노드를 스택에 삽입한다. 만약 모든노드가 방문되었거나, 혹은 연결된 노드가 없는경우, 해당 노드를 스택에서 제거한다. 이과정을 반복하여 정점을 탐색한다.

BFS의 경우 큐를 활용한다. 첫노드를 방문처리하고, 큐에 삽입한다. 큐에서 한개의 노드를 꺼낸뒤, 해당 노드와 연결된 자식노드를 모두 큐에 삽입한다. 해당 과정을 반복하여 정점을 탐색한다.

# 3. 소스코드

```javascript
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [V, E, start] = input.shift().split(" ").map(Number);
const graphArr = new Array(V + 1).fill(0).map(() => {
  return [];
});
for (let i = 0; i < input.length; i++) {
  const info = input[i].split(" ").map(Number);
  graphArr[info[0]].push(info[1]);
  graphArr[info[1]].push(info[0]);
}
for (let i = 1; i < graphArr.length; i++) {
  graphArr[i].sort(function (a, b) {
    return a - b;
  });
}

function DFS() {
  const result = [start];
  const stack = [start];
  const visitedArr = [];
  visitedArr[start] = 0;
  while (stack.length > 0) {
    const visitNum = stack[stack.length - 1];
    let flag = false;
    for (let i = 0; i < graphArr[visitNum].length; i++) {
      if (visitedArr[graphArr[visitNum][i]] === undefined) {
        flag = true;
        stack.push(graphArr[visitNum][i]);
        visitedArr[graphArr[visitNum][i]] = 0;
        result.push(graphArr[visitNum][i]);
        break;
      }
    }

    if (!flag) {
      stack.pop();
    }
  }
  return result.join(" ");
}

function BFS() {
  const result = [start];
  const queue = [start];
  const visitedArr = [];
  visitedArr[start] = 0;
  while (queue.length > 0) {
    const visitNum = queue.shift();
    for (let i = 0; i < graphArr[visitNum].length; i++) {
      if (visitedArr[graphArr[visitNum][i]] === undefined) {
        queue.push(graphArr[visitNum][i]);
        visitedArr[graphArr[visitNum][i]] = 0;
        result.push(graphArr[visitNum][i]);
      }
    }
  }
  return result.join(" ");
}

console.log(DFS());
console.log(BFS());
```
