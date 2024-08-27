const fs = require("fs");
const md5 = require("md5");
const input = fs.readFileSync("input.txt", "utf8").trim();

function part1() {
  let counter = 0;
  let hash = "";
  while (hash.substring(0, 5) !== "00000") {
    counter++;
    hash = md5(input + counter);
  }
  return counter;
}

function part2() {
  let counter = 0;
  let hash = "";
  while (hash.substring(0, 6) !== "000000") {
    counter++;
    hash = md5(input + counter);
  }
  return counter;
}

console.log(part1());
console.log(part2());
