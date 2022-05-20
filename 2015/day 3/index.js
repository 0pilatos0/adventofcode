const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("");

function part1() {
  let deliveredlocations = [];
  let position = {
    x: 0,
    y: 0,
  };
  deliveredlocations.push(position.x + "," + position.y);
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "^") {
      position.y++;
    } else if (input[i] === ">") {
      position.x++;
    } else if (input[i] === "v") {
      position.y--;
    } else if (input[i] === "<") {
      position.x--;
    }
    if (!deliveredlocations.includes(position.x + "," + position.y)) {
      deliveredlocations.push(position.x + "," + position.y);
    }
  }

  return deliveredlocations.length;
}

function part2() {
  let deliveredlocations = [];
  let santaposition = {
    x: 0,
    y: 0,
  };
  let roboPosition = {
    x: 0,
    y: 0,
  };

  deliveredlocations.push(santaposition.x + "," + santaposition.y);
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      if (input[i] === "^") {
        santaposition.y++;
      } else if (input[i] === ">") {
        santaposition.x++;
      } else if (input[i] === "v") {
        santaposition.y--;
      } else if (input[i] === "<") {
        santaposition.x--;
      }
      if (
        !deliveredlocations.includes(santaposition.x + "," + santaposition.y)
      ) {
        deliveredlocations.push(santaposition.x + "," + santaposition.y);
      }
    }
    if (i % 2 === 1) {
      if (input[i] === "^") {
        roboPosition.y++;
      } else if (input[i] === ">") {
        roboPosition.x++;
      } else if (input[i] === "v") {
        roboPosition.y--;
      } else if (input[i] === "<") {
        roboPosition.x--;
      }
      if (!deliveredlocations.includes(roboPosition.x + "," + roboPosition.y)) {
        deliveredlocations.push(roboPosition.x + "," + roboPosition.y);
      }
    }
  }

  return deliveredlocations.length;
}

console.log(part1());
console.log(part2());
