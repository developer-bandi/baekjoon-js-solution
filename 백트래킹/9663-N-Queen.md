# 1. 문제

https://www.acmicpc.net/problem/9663

# 2. 아이디어

체스판의 형태를 그래프로 표현할수 있기에, 그래프를 이용하되, 모든 경우를 따지지 않고, 이전경로를 보고 이후 경로를 선택해야 한다. 모든 경우를 탐색한후 조건에 맞는지 알아볼수도 있지만, 이러한 경우 경우의수가 너무 커지기 때문에, 이렇게 해결하여서는 안된다.

가장 중요한 아이디어는 한줄에 한개의 체스말만 들어갈수 있다는것이다. 이를 이용하여, 기본적으로 dfs 의 방식으로 문제를 해결해 나간다. 단 방문한 노드를 방문처리 하지않고, 마지막 줄을 방문했을때가 1개의 경우이므로 이때만 count를 추가한다. 또한 해당 깊이 에서 형제노드를 추가할때는, 현재 진행중인 앞선 노드들과 라인이 겹치지 않는지 판단하여 겹친다면 스택에 추가하지 않아야 한다.

# 3. 소스코드

```javascript
const fs = require("fs");
const input = Number(fs.readFileSync("/dev/stdin").toString().trim());

const stack = new Array(input).fill(0).map((data, index) => {
  return [0, input - 1 - index];
});
const nowChessBoard = [];
let count = 0;
while (stack.length > 0) {
  const current = stack.pop();

  if (current[0] === input - 1) {
    count++;
  } else {
    nowChessBoard[current[0]] = current;
    for (let i = input - 1; i >= 0; i--) {
      let flag = true;
      for (let j = 0; j <= current[0]; j++) {
        if (
          nowChessBoard[j][0] + nowChessBoard[j][1] === current[0] + 1 + i ||
          nowChessBoard[j][0] - nowChessBoard[j][1] === current[0] + 1 - i ||
          nowChessBoard[j][1] === i
        ) {
          flag = false;
          break;
        }
      }
      if (flag) {
        stack.push([current[0] + 1, i]);
      }
    }
  }
}
console.log(count);
```
