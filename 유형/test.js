const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function push(heap, element) {
  heap.push(element);

  let index = heap.length - 1;

  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    if (heap[index][2] < heap[parent][2]) {
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

    if (heap[left][2] < heap[next][2]) next = left;

    if (right < heap.length && heap[right][2] < heap[next][2]) next = right;

    if (index === next) break;

    const temporary = heap[index];

    heap[index] = heap[next];
    heap[next] = temporary;
    index = next;
  }

  return result;
}
let i = 0
const move = [[1,0],[0,1],[0,-1],[-1,0]]
const resultArr = []

while(true){
  const curCave = []

  const size = Number(input[i])
  if(size===0){
    break
  }
  for(let j = i+1;j<i+1+size;j++){
    curCave.push(input[j].split(" ").map(Number))
  }
  const heap = [[0,0,curCave[0][0]]]
  out: while(heap.length>0){
    const cur = pop(heap)
    for(let k = 0;k<move.length;k++){
      const curMove = [cur[0]+move[k][0],cur[1]+move[k][1]]
      if(curMove[0]===size-1&&curMove[1]===size-1){
        resultArr.push(`Problem ${resultArr.length+1}: ${cur[2]+curCave[curMove[0]][curMove[1]]}`)
        break out
      }
      if(curMove[0]>=0&&curMove[0]<size&&curMove[1]>=0&&curMove[1]<size){
        if(curCave[curMove[0]][curMove[1]]!==-1){
          push(heap,[curMove[0],curMove[1],cur[2]+curCave[curMove[0]][curMove[1]]])
          curCave[curMove[0]][curMove[1]]=-1
        }
      }
    }
  }
  i += size+1
}

console.log(resultArr.join("\n"))