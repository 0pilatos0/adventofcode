import chalk from "chalk";
import path from "path";
import { part1 } from "./solutions/part1";
import { part2 } from "./solutions/part2";

// Default to test input, overridden by flags
let USETESTINPUT = true;

// Process command-line arguments
const args = process.argv.slice(2);
if (args.includes("--real")) USETESTINPUT = false;
if (args.includes("--test")) USETESTINPUT = true;

// Fancy ASCII Art Header
console.clear();
console.log(
  chalk.red.bold(`
★  ☆  ✨  🎄  ✨  ☆  ★
 🎅 ADVENT OF CODE 🎅
   ★  ☆  2025  ☆  ★
★  ☆  ✨  🎄  ✨  ☆  ★
  `)
);
console.log(chalk.blue(`Using ${chalk.bold(USETESTINPUT ? "test" : "real")} input\n`));

// Helper function to format section headers
function formatSectionHeader(title: string) {
  const line = "━".repeat(title.length + 12);
  const formattedTitle = `      ${title}  `;
  return `${chalk.yellow(line)}\n${chalk.green.bold(formattedTitle)}\n${chalk.yellow(line)}`;
}

// Load input files
const inputDir = path.join(import.meta.dir, "input");
const testInputPath = path.join(inputDir, "input_test.txt");
const realInputPath = path.join(inputDir, "input_real.txt");

// Verify input files
function verifyFile(filePath: string) {
  try {
    Bun.file(filePath).text();
  } catch {
    console.log(chalk.red(`❌ Missing input file: ${filePath}`));
    process.exit(1);
  }
}
verifyFile(testInputPath);
verifyFile(realInputPath);

const testInput = await Bun.file(testInputPath).text();
const realInput = await Bun.file(realInputPath).text();
const input = USETESTINPUT ? testInput : realInput;

// Helper function to format memory size
function formatMemory(bytes: number): string {
  const absBytes = Math.abs(bytes);
  if (absBytes < 1024) return `${absBytes.toFixed(0)} B`;
  if (absBytes < 1024 * 1024) return `${(absBytes / 1024).toFixed(2)} KB`;
  return `${(absBytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Function to execute and profile a solution
async function executeSolution(partName: string, solutionFn: (input: string) => unknown, input: string) {
  console.log(formatSectionHeader(partName));

  // Force garbage collection (Bun-specific)
  if (typeof Bun !== "undefined" && Bun.gc) {
    Bun.gc(true);
  }

  const memBefore = process.memoryUsage().heapUsed;
  const startTime = performance.now();

  try {
    const result = await solutionFn(input);
    const endTime = performance.now();
    const memAfter = process.memoryUsage().heapUsed;
    const memUsed = memAfter - memBefore;

    console.log(`${chalk.bold("Result:")} ${chalk.cyan(result)}`);
    console.log(chalk.gray(`[Execution time: ${(endTime - startTime).toFixed(2)}ms]`));

    // Show memory delta (may be negative due to GC)
    const memSign = memUsed >= 0 ? "+" : "";
    console.log(chalk.gray(`[Memory delta: ${memSign}${formatMemory(memUsed)}]\n`));
  } catch (error) {
    console.log(chalk.red(`⚠️ Error in ${partName}:`));
    console.error(error);
  }
}

// Execute parts
await executeSolution("Part 1", part1, input);
await executeSolution("Part 2", part2, input);

// Summary
console.log("\n" + chalk.bold.bgGreen(" 🎉 Task Completed! 🎉 "));
