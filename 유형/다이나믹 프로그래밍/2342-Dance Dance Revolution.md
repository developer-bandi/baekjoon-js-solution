# 1. 아이디어

매 경우 마다 이동을 한 상황을 구해야하는데, 이때 왼쪽을 이동할수도 있고, 오른쪽을 이동할수도 있으므로, 모든 경우를 구할경우 2의 100000승이 되기 때문에, 적절한 범위내에서 축약을 해야한다. 문제에서 사용자가 이동할수 있는 칸은 왼쪽 오른쪽 0부터 4까지 총 25가지 이므로, 매번 해당경우에 대해서만 두가지 경우를 찾고, 해당 경우들중 작은 값을 누적해가면서 다음 이동을 처리하면 된다.

# 2. 소스코드

```javascript
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let dp = new Array(5).fill(0).map(() => []);
dp[0][0] = 0;
for (let i = 0; i < input.length - 1; i++) {
  let temp = new Array(5).fill(0).map(() => []);
  for (let j = 0; j < 5; j++) {
    for (let k = 0; k < 5; k++) {
      if (dp[j][k] === undefined) continue;
      for (let l = 0; l < 2; l++) {
        const target = l === 0 ? j : k;
        let point = 0;

        if (target === input[i]) {
          point = 1;
        } else if (target === 0) {
          point = 2;
        } else if (
          (target + 1 === 5 ? 1 : target + 1) === input[i] ||
          (target - 1 === 0 ? 4 : target - 1) === input[i]
        ) {
          point = 3;
        } else {
          point = 4;
        }
        if (l === 0) {
          temp[input[i]][k] =
            temp[input[i]][k] === undefined
              ? dp[j][k] + point
              : Math.min(temp[input[i]][k], dp[j][k] + point);
        } else {
          temp[j][input[i]] =
            temp[j][input[i]] === undefined
              ? dp[j][k] + point
              : Math.min(temp[j][input[i]], dp[j][k] + point);
        }
      }
    }
  }
  dp = temp;
}
dp = dp.flat();
dp.sort(function (a, b) {
  return a - b;
});
console.log(dp[0]);
```
