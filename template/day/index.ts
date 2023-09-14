import chalk from "chalk";
import path from "path";
import { part1 } from "./solutions/part1";
import { part2 } from "./solutions/part2";

const USETESTINPUT = false;

const testInput = await Bun.file(
  path.join(import.meta.dir, "input", "input_test.txt")
).text();
const realInput = await Bun.file(
  path.join(import.meta.dir, "input", "input_real.txt")
).text();

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
