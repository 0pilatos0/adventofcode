import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import gradient from "gradient-string";

const greetUser = () => {
  console.log(gradient.pastel(figlet.textSync("Challenge CLI", { horizontalLayout: "full" })));
};

const promptYearAndDay = async () => {
  const year = await inquirer.prompt([
    {
      type: "input",
      name: "year",
      message: "What year is the challenge from?",
      default: new Date().getFullYear().toString(),
      validate: (input) => (/^\d{4}$/.test(input) ? true : "Please enter a valid year."),
    },
  ]);

  const day = await inquirer.prompt([
    {
      type: "input",
      name: "day",
      message: "What day is the challenge from?",
      default: "1",
      validate: (input) => (Number(input) >= 1 && Number(input) <= 31 ? true : "Please enter a valid day between 1 and 31."),
    },
  ]);

  return { year: year.year, day: day.day };
};

const confirmCreation = async (year, day) => {
  const confirm = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Create a new solution file for ${year}/day${day}?`,
    },
  ]);
  return confirm.confirm;
};

const createDirectories = (yearPath, dayPath) => {
  if (!fs.existsSync(yearPath)) {
    fs.mkdirSync(yearPath);
  }
  if (!fs.existsSync(dayPath)) {
    fs.mkdirSync(dayPath);
  }
};

const copyTemplate = (templatePath, dayPath) => {
  const spinner = ora("Copying template files...").start();
  try {
    const copyDirWithSubDirs = (src, dest) => {
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
    spinner.succeed("Template files copied successfully!");
  } catch (error) {
    spinner.fail("Failed to copy template files.");
    console.error(chalk.red("Error:", error));
    process.exit(1);
  }
};

const main = async () => {
  greetUser();

  const { year, day } = await promptYearAndDay();
  const confirm = await confirmCreation(year, day);

  if (!confirm) {
    console.log(chalk.yellow("Exiting..."));
    process.exit(0);
  }

  const templatePath = path.join(__dirname, "template");
  const yearPath = path.join(__dirname, year);
  const dayPath = path.join(yearPath, `day ${day}`);

  createDirectories(yearPath, dayPath);
  copyTemplate(templatePath, dayPath);

  console.log(chalk.green(`New solution file created at ${chalk.bold(`${yearPath}/day ${day}`)}`));
  process.exit(0);
};

main();
