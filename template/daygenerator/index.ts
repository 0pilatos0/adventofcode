//ask for user input for year and day number

const { prompt } = require("enquirer");
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

//copy the template folder to the new folder
//rename the files in the new folder to match the day number

const main = async () => {
  const response = await prompt([
    {
      type: "input",
      name: "year",
      message: "What year is it?",
      initial: "2020",
    },
    {
      type: "input",
      name: "day",
      message: "What day is it?",
      initial: "1",
    },
  ]);
  const year = response.year;
  const day = response.day;

  console.log(`Creating files for ${year} day ${day}`);
};

main();
