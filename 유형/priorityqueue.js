function push(heap, element) {
  heap.push(element);

  let index = heap.length - 1;

  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    if (heap[index][1] > heap[parent][1]) {
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

    if (heap[left][1] > heap[next][1]) next = left;

    if (right < heap.length && heap[right][1] > heap[next][1]) next = right;

    if (index === next) break;

    const temporary = heap[index];

    heap[index] = heap[next];
    heap[next] = temporary;
    index = next;
  }
  return result;
}
