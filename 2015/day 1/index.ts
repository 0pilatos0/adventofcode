import chalk from "chalk";
import path from "path";
import { part1 } from "./solutions/part1";
import { part2 } from "./solutions/part2";

//The default value for using the test input, this can be overwritten by passing in the --test or --real flag when running the script
let USETESTINPUT = true;

const args = process.argv.slice(2);
if (args.length > 0) {
  if (args[0] === "--real") USETESTINPUT = false;
}

console.log(chalk.blue("Advent of Code 2023 - using the " + chalk.bold(USETESTINPUT ? "test" : "real") + " input"));

const testInput = await Bun.file(path.join(import.meta.dir, "input", "input_test.txt")).text();
const realInput = await Bun.file(path.join(import.meta.dir, "input", "input_real.txt")).text();

const input = USETESTINPUT ? testInput : realInput;

/* Helper function to format section headers */
function formatSectionHeader(title: string) {
  const line = "=".repeat(title.length + 12);
  const formattedTitle = `      ${title}  `;
  return `${line}\n${chalk.green(formattedTitle)}\n${line}`;
}

/* call the results */
console.log(formatSectionHeader("Part 1"));
const p1StartTime = Date.now();
const part1Result = part1(input);
const p1EndTime = Date.now();

console.log(chalk.bold(part1Result) + chalk.gray(` [${p1EndTime - p1StartTime}ms]`));

console.log(formatSectionHeader("Part 2"));
const p2StartTime = Date.now();
const part2Result = part2(input);
const p2EndTime = Date.now();

console.log(chalk.bold(part2Result) + chalk.gray(` [${p2EndTime - p2StartTime}ms]`));
