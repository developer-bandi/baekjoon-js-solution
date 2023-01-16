function solution(commands) {
  const mergeList = [];
  const table = new Array(5).fill(0).map(() => new Array(5));
  const result = [];
  for (let i = 0; i < commands.length; i++) {
    const row = commands[i].split(" ");
    if (row[0] === "UPDATE") {
      if (row.length === 4) {
        if (typeof table[row[1]][row[2]] === "number") {
          mergeList[table[row[1]][row[2]]].value = row[3];
        } else {
          table[row[1]][row[2]] = row[3];
        }
      } else {
        for (let j = 0; j < table.length; j++) {
          for (let k = 0; k < table[j].length; k++) {
            if (table[j][k] === row[1]) table[j][k] = row[2];
          }
        }
        mergeList.forEach(({ value }, index) => {
          if (value === row[1]) {
            mergeList[index].value = row[2];
          }
        });
      }
    } else if (row[0] === "MERGE") {
      if (row[1] === row[3] && row[2] === row[4]) continue;
      if (
        table[row[1]][row[2]] !== undefined &&
        table[row[3]][row[4]] !== undefined
      ) {
        if (typeof table[row[1]][row[2]] === "number") {
          if (typeof table[row[3]][row[4]] === "number") {
            mergeList[table[row[3]][row[4]]].list.forEach(([x, y]) => {
              table[x][y] = table[row[1]][row[2]];
              mergeList[table[row[1]][row[2]]].list.push([x, y]);
            });
          } else {
            table[row[3]][row[4]] = table[row[1]][row[2]];
          }
        } else {
          if (typeof table[row[3]][row[4]] === "number") {
            mergeList[table[row[3]][row[4]]].value = table[row[1]][row[2]];
            mergeList[table[row[3]][row[4]]].list.push([row[1], row[2]]);
          } else {
            mergeList.push({
              value: table[row[1]][row[2]],
              list: [
                [row[1], row[2]],
                [row[3], row[4]],
              ],
            });
            table[row[1]][row[2]] = mergeList.length - 1;
            table[row[3]][row[4]] = mergeList.length - 1;
          }
        }
      } else if (table[row[1]][row[2]] !== undefined) {
        if (typeof table[row[1]][row[2]] === "number") {
          mergeList[table[row[1]][row[2]]].list.push([row[3], row[4]]);
          table[row[3]][row[4]] = table[row[1]][row[2]];
        } else {
          mergeList.push({
            value: table[row[1]][row[2]],
            list: [
              [row[1], row[2]],
              [row[3], row[4]],
            ],
          });
          table[row[1]][row[2]] = mergeList.length - 1;
          table[row[3]][row[4]] = mergeList.length - 1;
        }
      } else if (table[row[3]][row[4]] !== undefined) {
        if (typeof table[row[3]][row[4]] === "number") {
          mergeList[table[row[3]][row[4]]].list.push([row[1], row[2]]);
          table[row[1]][row[2]] = table[row[3]][row[4]];
        } else {
          mergeList.push({
            value: table[row[3]][row[4]],
            list: [
              [row[1], row[2]],
              [row[3], row[4]],
            ],
          });
          table[row[1]][row[2]] = mergeList.length - 1;
          table[row[3]][row[4]] = mergeList.length - 1;
        }
      } else {
        mergeList.push({
          value: undefined,
          list: [
            [row[1], row[2]],
            [row[3], row[4]],
          ],
        });
        table[row[1]][row[2]] = mergeList.length - 1;
        table[row[3]][row[4]] = mergeList.length - 1;
      }
    } else if (row[0] === "UNMERGE") {
      if (typeof table[row[1]][row[2]] === "number") {
        const index = table[row[1]][row[2]];
        mergeList[table[row[1]][row[2]]].list.forEach(([x, y]) => {
          table[x][y] = undefined;
        });
        if (mergeList[index].value !== undefined) {
          table[row[1]][row[2]] = mergeList[index].value;
        }
        mergeList[index] = undefined;
      }
    } else {
      if (table[row[1]][row[2]] !== undefined) {
        if (typeof table[row[1]][row[2]] === "number") {
          result.push(mergeList[table[row[1]][row[2]]].value);
        } else {
          result.push(table[row[1]][row[2]]);
        }
      } else {
        result.push("EMPTY");
      }
    }
  }
  return result;
}

console.log(
  solution([
    "UPDATE 1 1 menu",
    "UPDATE 1 2 category",
    "UPDATE 2 1 bibimbap",
    "UPDATE 2 2 korean",
    "UPDATE 2 3 rice",
    "UPDATE 3 1 ramyeon",
    "UPDATE 3 2 korean",
    "UPDATE 3 3 noodle",
    "UPDATE 3 4 instant",
    "UPDATE 4 1 pasta",
    "UPDATE 4 2 italian",
    "UPDATE 4 3 noodle",
    "MERGE 1 2 1 3",
    "MERGE 1 3 1 4",
    "UPDATE korean hansik",
    "UPDATE 1 3 group",
    "UNMERGE 1 4",
    "PRINT 1 3",
    "PRINT 1 4",
  ])
);

console.log(
  solution([
    "UPDATE 1 1 a",
    "UPDATE 1 2 b",
    "UPDATE 2 1 c",
    "UPDATE 2 2 d",
    "MERGE 1 1 1 2",
    "MERGE 2 2 2 1",
    "MERGE 2 1 1 1",
    "PRINT 1 1",
    "UNMERGE 2 2",
    "PRINT 1 1",
  ])
);
