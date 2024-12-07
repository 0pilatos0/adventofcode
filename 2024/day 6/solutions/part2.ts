export function part2(input: string): string {
  const map = input.split("\n").map((line) => {
    return line.split("");
  });

  let mapVariants = [];
  const emptySpaces = [];

  // Collect all empty spaces first
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === ".") {
        emptySpaces.push([i, j]);
      }
    }
  }

  for (const [i, j] of emptySpaces) {
    map[i][j] = "#";
    mapVariants.push(map.map((row) => row.slice()));
    map[i][j] = ".";
  }

  let validLocations = 0;

  for (const variant of mapVariants) {
    let locationsVisited = new Set<string>();

    let x = 0;
    let y = 0;

    for (let i = 0; i < variant.length; i++) {
      if (variant[i].includes("^")) {
        x = variant[i].indexOf("^");
        y = i;
        break;
      }
    }

    let direction: "up" | "down" | "left" | "right" = "up";

    while (true) {
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

      //if we have been to this location before, we have found a valid location
      if (locationsVisited.has(`${x},${y},${direction}`)) {
        validLocations++;
        break;
      }

      locationsVisited.add(`${x},${y},${direction}`);

      if (x + nextChar[0] < 0 || x + nextChar[0] >= variant[0].length || y + nextChar[1] < 0 || y + nextChar[1] >= variant.length) {
        break;
      }

      if (variant[y + nextChar[1]][x + nextChar[0]] === "#") {
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
  }

  return validLocations.toString();
}
