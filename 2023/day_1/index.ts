import { part1 } from "./solutions/part1";
import { part2 } from "./solutions/part2";
const fs = require("fs");

const USETESTINPUT = false;

/* Input definition */
const testInput = fs.readFileSync(__dirname + "/input/input_test.txt", "utf8");
const realInput = fs.readFileSync(__dirname + "/input/input_real.txt", "utf8");

const input = USETESTINPUT ? testInput : realInput;

/* call the results */
console.log("--------- part 1 ----------");
console.log(part1(input));
console.log("--------- part 2 ----------");
console.log(part2(input));
