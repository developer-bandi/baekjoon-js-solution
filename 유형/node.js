const input = +require("fs").readFileSync("/dev/stdin").toString().trim();

const visited = [];
visited[input] = 0;
let queue = [input];
let count = 0;
if (input !== 1) {
  out: while (true) {
    count++;
    const tempt = [];
    for (let i = 0; i < queue.length; i++) {
      if (queue[i] % 3 === 0 && visited[queue[i] / 3] !== 0) {
        if (queue[i] / 3 === 1) break out;
        tempt.push(queue[i] / 3);
        visited[queue[i] / 3] = 0;
      }

      if (queue[i] % 2 === 0 && visited[queue[i] / 2] !== 0) {
        if (queue[i] / 2 === 1) break out;
        tempt.push(queue[i] / 2);
        visited[queue[i] / 2] = 0;
      }

      if (visited[queue[i] - 1] !== 0) {
        if (queue[i] - 1 === 1) break out;
        tempt.push(queue[i] - 1);
        visited[queue[i] - 1] = 0;
      }
    }
    queue = tempt;
  }
}

console.log(count);
