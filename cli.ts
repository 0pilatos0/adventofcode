import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";

const year = await inquirer.prompt([
  {
    type: "input",
    name: "year",
    message: "What year is the challenge from?",
    default: new Date().getFullYear().toString(),
  },
]);

const day = await inquirer.prompt([
  {
    type: "input",
    name: "day",
    message: "What day is the challenge from?",
    default: "1",
  },
]);

const confirm = await inquirer.prompt([
  {
    type: "confirm",
    name: "confirm",
    message: `Create a new solution file for ${year.year}/day${day.day}?`,
  },
]);

if (!confirm.confirm) {
  console.log("Exiting...");
  process.exit(0);
}

const templatePath = path.join(__dirname, "template");
const yearPath = path.join(__dirname, year.year);

if (!fs.existsSync(yearPath)) {
  fs.mkdirSync(yearPath);
}

const dayPath = path.join(yearPath, `day ${day.day}`);
if (!fs.existsSync(dayPath)) {
  fs.mkdirSync(dayPath);
}

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
console.log(`New solution file created at ${yearPath}/day ${day.day}`);
