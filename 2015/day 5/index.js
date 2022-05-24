const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

function part1() {
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    let correct = 0;
    let temp = input[i].split("");
    let vowels = 0;
    for (let j = 0; j < temp.length; j++) {
      if (
        temp[j] === "a" ||
        temp[j] === "e" ||
        temp[j] === "i" ||
        temp[j] === "o" ||
        temp[j] === "u"
      ) {
        vowels++;
      }
    }
    if (vowels >= 3) {
      correct++;
    }
    let double = false;
    for (let j = 0; j < temp.length - 1; j++) {
      if (temp[j] === temp[j + 1]) {
        double = true;
      }
    }
    if (double) {
      correct++;
    }

    let ab = false;
    let cd = false;
    let pq = false;
    let xy = false;
    for (let j = 0; j < temp.length - 1; j++) {
      if (temp[j] + temp[j + 1] === "ab") {
        ab = true;
      }
      if (temp[j] + temp[j + 1] === "cd") {
        cd = true;
      }
      if (temp[j] + temp[j + 1] === "pq") {
        pq = true;
      }
      if (temp[j] + temp[j + 1] === "xy") {
        xy = true;
      }
    }
    if (!ab && !cd && !pq && !xy) {
      correct++;
    }

    if (correct >= 3) {
      counter++;
    }
  }
  return counter;
}

function part2() {
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    let correct = 0;
    let temp = input[i].split("");

    //It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).

    let pairs = [];
    for (let j = 0; j < temp.length - 1; j++) {
      pairs.push(temp[j] + temp[j + 1]);
    }

    //check if there are any pairs that appear at least twice
    let double = false;
    for (let j = 0; j < pairs.length - 1; j++) {
      for (let k = j + 2; k < pairs.length; k++) {
        if (pairs[j] === pairs[k]) {
          double = true;
        }
      }
    }

    if (double) {
      correct++;
    }

    //check if temp It contains at least one letter which repeats with exactly one letter between them
    let repeat = false;
    for (let j = 0; j < temp.length - 2; j++) {
      if (temp[j] === temp[j + 2]) {
        repeat = true;
      }
    }

    if (repeat) {
      correct++;
    }

    if (correct >= 2) {
      counter++;
    }
  }
  return counter;
}
console.log(part1());
console.log(part2());
