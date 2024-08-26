//initial implementation before the ts refactor

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("");

function part1() {
  let floor = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else if (input[i] === ")") {
      floor--;
    }
  }
  return floor;
}

function part2() {
  let floor = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else if (input[i] === ")") {
      floor--;
    }
    if (floor < 0) {
      return i + 1;
    }
  }

  return "Santa is not in the basement";
}

console.log(part1());
console.log(part2());
