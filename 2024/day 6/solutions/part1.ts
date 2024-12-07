import { dir } from "console";

export function part1(input: string): string {
  let locationsVisited = new Set<string>();

  let x = 0;
  let y = 0;

  const map = input.split("\n").map((line) => {
    return line.split("");
  });

  //find the starting point of the guard marked by "^"
  for (let i = 0; i < map.length; i++) {
    if (map[i].includes("^")) {
      x = map[i].indexOf("^");
      y = i;
      break;
    }
  }

  let direction: "up" | "down" | "left" | "right" = "up";

  while (true) {
    locationsVisited.add(`${x},${y}`);

    let nextChar = [0, -1];
    switch (direction) {
      case "up":
        nextChar = [0, -1];
        break;
      case "down":
        nextChar = [0, 1];
        break;
      case "left":
        nextChar = [-1, 0];
        break;
      case "right":
        nextChar = [1, 0];
        break;
      default:
        break;
    }

    if (x + nextChar[0] < 0 || x + nextChar[0] >= map[0].length || y + nextChar[1] < 0 || y + nextChar[1] >= map.length) {
      break;
    }

    if (map[y + nextChar[1]][x + nextChar[0]] === "#") {
      if (direction === "up") {
        direction = "right";
      } else if (direction === "down") {
        direction = "left";
      } else if (direction === "left") {
        direction = "up";
      } else if (direction === "right") {
        direction = "down";
      }
    } else {
      x += nextChar[0];
      y += nextChar[1];
    }
  }

  return locationsVisited.size.toString();
}
