import { part1 } from "./solutions/part1";
import { part2 } from "./solutions/part2";
import fs from "fs";
import path from "path";
import chalk from "chalk";

const { readFileSync } = fs;

const USETESTINPUT = false;

/* Input definition */
const testInput = readFileSync(
  path.join(__dirname, "input", "input_test.txt"),
  "utf8"
);
const realInput = readFileSync(
  path.join(__dirname, "input", "input_real.txt"),
  "utf8"
);

const input = USETESTINPUT ? testInput : realInput;

/* Helper function to format section headers */
function formatSectionHeader(title: string) {
  const line = "=".repeat(title.length + 4);
  const formattedTitle = `  ${title}  `;
  return `${line}\n${formattedTitle}\n${line}`;
}

/* call the results */
console.log(formatSectionHeader("Part 1"));
console.log(chalk.yellow(part1(input)));
console.log(formatSectionHeader("Part 2"));
console.log(chalk.yellow(part2(input)));
