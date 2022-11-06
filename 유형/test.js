const buttonStatus = { a: 1, b: 1, c: 1 };
const test = "a";
console.log({
  ...Object.keys(buttonStatus).map((data) => {
    return { data: "light" };
  }),
  [test]: "dark",
});
