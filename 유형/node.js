const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s/);
const passwordLength = Number(input[0]);
const charArr = input.slice(2, input.length).sort();
const aieouArr = ["a", "i", "u", "e", "o"];
const stack = [...charArr].reverse().map((data) => {
  if (aieouArr.indexOf(data) == -1) {
    return {collection: 0, Consonant: 1, password: data};
  } else {
    return {collection: 1, Consonant: 0, password: data};
  }
});
const result = [];
while (stack.length > 0) {
  const current = stack.pop();
  if (current.password.length === passwordLength) {
    if (current.collection >= 1 && current.Consonant >= 2) {
      result.push(current.password);
    }
  } else {
    for (
      let i =
        charArr.indexOf(current.password[current.password.length - 1]) + 1;
      i < charArr.length - (passwordLength - current.password.length - 1);
      i++
    ) {
      if (aieouArr.indexOf(charArr[i]) !== -1) {
        stack.push({
          Consonant: current.Consonant,
          collection: current.collection + 1,
          password: current.password + charArr[i],
        });
      } else {
        stack.push({
          Consonant: current.Consonant + 1,
          collection: current.collection,
          password: current.password + charArr[i],
        });
      }
    }
  }
}
result.sort();
console.log(result.join("\n"));
