const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8").trim().split("\n");

function part1() {
  let input = data;
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split("x");
    input[i][0] = parseInt(input[i][0]);
    input[i][1] = parseInt(input[i][1]);
    input[i][2] = parseInt(input[i][2]);

    let shortest = Math.min(
      input[i][0] * input[i][1],
      input[i][1] * input[i][2],
      input[i][0] * input[i][2]
    );
    let area =
      2 * input[i][0] * input[i][1] +
      2 * input[i][1] * input[i][2] +
      2 * input[i][0] * input[i][2];

    total = total + area + shortest;
  }
  return total;
}

function part2() {
  let input2 = data;
  let total2 = 0;
  for (let i = 0; i < input2.length; i++) {
    input2[i][0] = parseInt(input2[i][0]);
    input2[i][1] = parseInt(input2[i][1]);
    input2[i][2] = parseInt(input2[i][2]);

    let ribbon = Math.min(
      input2[i][0] + input2[i][0] + input2[i][1] + input2[i][1],
      input2[i][0] + input2[i][0] + input2[i][2] + input2[i][2],
      input2[i][1] + input2[i][1] + input2[i][2] + input2[i][2]
    );

    let bow = input2[i][0] * input2[i][1] * input2[i][2];

    total2 = total2 + ribbon + bow;
  }
  return total2;
}

console.log(part1());
console.log(part2());
