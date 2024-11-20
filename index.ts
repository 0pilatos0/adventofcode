//small script to go down into the current directory and remove all files that match input_test.txt or input_real.txt
const fs = require("fs");
const path = require("path");

const dir = process.cwd();
const files = fs.readdirSync(dir);

const checkDir = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      checkDir(filePath);
    } else if (file.includes("input_test.txt") || file.includes("input_real.txt") || file.includes("input.txt") || file.includes("data.txt")) {
      fs.unlinkSync(filePath);
    }
  }
};

checkDir(dir);
