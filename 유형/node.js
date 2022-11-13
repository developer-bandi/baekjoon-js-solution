function solution(target) {
  const singleBool = new Array(21).fill(0).map((_, idx) => {
    if (idx === 20) return 50;
    return idx + 1;
  });

  const notSingleBool = new Array(40)
    .fill(0)
    .map((_, idx) => {
      return idx + 21;
    })
    .filter((v) => {
      if (v <= 40) {
        if (v % 2 === 0 || v % 3 === 0) return true;
        return false;
      } else {
        if (v % 3 === 0) return true;
        return false;
      }
    });

  const visited = [];
  let sums = [[0, 0]];
  let count = 0;
  while (true) {
    count++;
    const bool = [];
    const tempt = [];
    for (let i = 0; i < sums.length; i++) {
      for (let j = 0; j < singleBool.length; j++) {
        const next = [sums[i][0] + singleBool[j], sums[i][1] + 1];
        if (visited[next[0]] !== 0) {
          bool[next[0]] =
            bool[next[0]] === undefined
              ? next[1]
              : Math.max(bool[next[0]], next[1]);
          tempt.push(next[0]);
        }
      }
      for (let j = 0; j < notSingleBool.length; j++) {
        const next = [sums[i][0] + notSingleBool[j], sums[i][1]];
        if (visited[next[0]] !== 0) {
          bool[next[0]] =
            bool[next[0]] === undefined
              ? next[1]
              : Math.max(bool[next[0]], next[1]);
          tempt.push(next[0]);
        }
      }
    }
    sums = [];
    for (let i = 0; i < tempt.length; i++) {
      if (tempt[i] === target) {
        return [count, bool[tempt[i]]];
      }
      if (visited[tempt[i]] !== 0) {
        sums.push([tempt[i], bool[tempt[i]]]);
        visited[tempt[i]] = 0;
      }
    }
  }
}

console.log(solution(21));
console.log(solution(58));
