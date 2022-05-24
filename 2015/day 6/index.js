const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").trim().split("\n");

function light(x, y) {
  this.x = x;
  this.y = y;
  this.on = false;
  this.brightness = 0;

  this.turnOn = function () {
    this.on = true;
  };
  this.turnOff = function () {
    this.on = false;
  };
  this.toggle = function () {
    this.on = !this.on;
  };

  this.updatebrightness = function (amount) {
    this.brightness += amount;
    if (this.brightness < 0) {
      this.brightness = 0;
    }
  };
}

function part1() {
  let grid = [];
  for (let i = 0; i < 1000; i++) {
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
      grid[i][j] = new light(i, j);
    }
  }

  for (let i = 0; i < input.length; i++) {
    let command = input[i].match(/(turn on)|(turn off)|(toggle)/)[0];
    let coords = input[i].match(/\d+,\d+/g);

    let x1 = parseInt(coords[0].split(",")[0]);
    let y1 = parseInt(coords[0].split(",")[1]);
    let x2 = parseInt(coords[1].split(",")[0]);
    let y2 = parseInt(coords[1].split(",")[1]);

    if (command === "turn on") {
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          grid[i][j].turnOn();
        }
      }
    } else if (command === "turn off") {
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          grid[i][j].turnOff();
        }
      }
    } else if (command === "toggle") {
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          grid[i][j].toggle();
        }
      }
    }
  }

  let lightsOn = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (grid[i][j].on) {
        lightsOn++;
      }
    }
  }
  return lightsOn;
}

function part2() {
  let grid = [];
  for (let i = 0; i < 1000; i++) {
    grid[i] = [];
    for (let j = 0; j < 1000; j++) {
      grid[i][j] = new light(i, j);
    }
  }

  for (let i = 0; i < input.length; i++) {
    let command = input[i].match(/(turn on)|(turn off)|(toggle)/)[0];
    let coords = input[i].match(/\d+,\d+/g);

    let x1 = parseInt(coords[0].split(",")[0]);
    let y1 = parseInt(coords[0].split(",")[1]);
    let x2 = parseInt(coords[1].split(",")[0]);
    let y2 = parseInt(coords[1].split(",")[1]);

    if (command === "turn on") {
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          grid[i][j].updatebrightness(1);
        }
      }
    } else if (command === "turn off") {
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          grid[i][j].updatebrightness(-1);
        }
      }
    } else if (command === "toggle") {
      for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
          grid[i][j].updatebrightness(2);
        }
      }
    }
  }

  let brightness = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      brightness += grid[i][j].brightness;
    }
  }
  return brightness;
}

console.log(part1());
console.log(part2());
