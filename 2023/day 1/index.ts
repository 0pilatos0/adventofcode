const fs = require("fs");

const USETESTINPUT = false;

/* Input definition */
const testInput = fs.readFileSync(__dirname + "/input_test.txt", "utf8");
const realInput = fs.readFileSync(__dirname + "/input.txt", "utf8");

const rawInput = USETESTINPUT ? testInput : realInput;

/*input mapping*/
const input = rawInput;

/* Part 1 */
const part1 = (input: unknown) => {
  return "not implemented yet";
};
/* Part 2 */
const part2 = (input: unknown) => {
  return "not implemented yet";
};

/* call the results */
console.log("--------- part 1 ----------");
console.log(part1(input));
console.log("--------- part 2 ----------");
console.log(part2(input));
