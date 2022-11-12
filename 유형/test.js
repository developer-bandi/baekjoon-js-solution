function solution(n, lighthouse) {
  const visited = new Array(n + 1).fill(false);
  let result = 0;
  while (lighthouse.length) {
    const graph = new Array(n + 1).fill(0).map(() => []);

    for (let i = 0; i < lighthouse.length; i++) {
      const row = lighthouse[i];
      graph[row[0]].push(row[1]);
      graph[row[1]].push(row[0]);
    }

    graph
      .filter((output) => output.length === 1)
      .forEach((entrys) => {
        const cur = entrys[0];
        if (!visited[cur]) {
          visited[cur] = true;
          if (graph[cur].length !== 1) {
            result += 1;
          } else {
            result += 0.5;
          }
        }
      });
    lighthouse = lighthouse.filter((el) => {
      const [a, b] = el;

      return !visited[a] && !visited[b];
    });
  }
  return result;
}

console.log(
  solution(8, [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [5, 6],
    [5, 7],
    [5, 8],
  ])
);
console.log(
  solution(10, [
    [4, 1],
    [5, 1],
    [5, 6],
    [7, 6],
    [1, 2],
    [1, 3],
    [6, 8],
    [2, 9],
    [9, 10],
  ])
);
