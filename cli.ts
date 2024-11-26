import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import gradient from "gradient-string";

const playFestiveMusic = () => {
  console.log(chalk.cyan("\u266b Jingle Bells, Jingle Bells, Jingle all the way! \u266b\n"));
};

const greetUser = () => {
  console.log(gradient.fruit(figlet.textSync("AOC CLI!", { horizontalLayout: "full" })));
  console.log(chalk.green("\nHo Ho Ho! Welcome to the Advent of Code Challenge CLI! Let's get festive and solve some puzzles!\n"));
  playFestiveMusic();
};

const promptYearAndDay = async () => {
  console.log(chalk.red("\u2744\ufe0f Time to choose your challenge! \u2744\ufe0f"));
  const year = await inquirer.prompt([
    {
      type: "input",
      name: "year",
      message: "\u26c4\ufe0f What year is the challenge from?",
      default: new Date().getFullYear().toString(),
      validate: (input) => (/^\d{4}$/.test(input) ? true : "Please enter a valid year."),
    },
  ]);

  const day = await inquirer.prompt([
    {
      type: "input",
      name: "day",
      message: "\ud83c\udf84 What day is the challenge from? (1-25)",
      default: "1",
      validate: (input) => (Number(input) >= 1 && Number(input) <= 25 ? true : "Please enter a valid day between 1 and 25."),
    },
  ]);

  return { year: year.year, day: day.day };
};

const confirmCreation = async (year: string, day: string) => {
  const confirm = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `\u2728 Create a new solution file for ${year}/day${day}? \u2728`,
    },
  ]);
  return confirm.confirm;
};

const createDirectories = (yearPath: string, dayPath: string) => {
  if (!fs.existsSync(yearPath)) {
    fs.mkdirSync(yearPath);
  }
  if (!fs.existsSync(dayPath)) {
    fs.mkdirSync(dayPath);
  }
};

const copyTemplate = (templatePath: string, dayPath: string) => {
  const spinner = ora("\ud83c\udf85 Copying template files... Ho Ho Ho!").start();
  try {
    const copyDirWithSubDirs = (src: string, dest: string) => {
      fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          copyDirWithSubDirs(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    copyDirWithSubDirs(templatePath, dayPath);
    spinner.succeed("\ud83c\udf1f Template files copied successfully! Let's get jolly! \ud83c\udf1f");
  } catch (error) {
    spinner.fail("\ud83d\udca5 Failed to copy template files. Bah, humbug!");
    console.error(chalk.red("Error:", error));
    process.exit(1);
  }
};

const displayMorningMotivation = () => {
  console.log(gradient.morning("\ud83c\udf89\u2b50 Rise and shine, it's time to sleigh the day! \u2b50\ud83c\udf89\n"));
  console.log(chalk.magenta("\ud83c\udf85 Santa believes in you, and so do I! Let's conquer today's challenge with festive cheer!\ud83c\udf84\n"));
};

const main = async () => {
  greetUser();
  displayMorningMotivation();

  const { year, day } = await promptYearAndDay();
  const confirm = await confirmCreation(year, day);

  if (!confirm) {
    console.log(chalk.yellow("\ud83c\udf42 Exiting... Maybe next time, Grinch! \ud83c\udf42"));
    process.exit(0);
  }

  const templatePath = path.join(__dirname, "template");
  const yearPath = path.join(__dirname, year);
  const dayPath = path.join(yearPath, `day ${day}`);

  createDirectories(yearPath, dayPath);
  copyTemplate(templatePath, dayPath);

  console.log(
    chalk.green(
      `\u2b50 New solution file created at ${chalk.bold(
        `${yearPath}/day ${day}`
      )} \u2b50\nGet ready to sleigh the challenge! \ud83c\udf85\nKeep up the festive spirit and let's make some magic happen! \ud83c\udf84\ud83c\udf89`
    )
  );
  process.exit(0);
};

main();
