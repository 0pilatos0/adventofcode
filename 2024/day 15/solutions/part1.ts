export function part1(input: string): string {
  const [rawMap, rawMoves] = input.trim().split("\r\n\r\n");
  const mapRows = rawMap.split("\r\n").map((r) => r.split(""));

  const moves = rawMoves.replace(/\r\n/g, "").split("");

  let robotY = 0;
  let robotX = 0;
  for (let y = 0; y < mapRows.length; y++) {
    for (let x = 0; x < mapRows[y].length; x++) {
      if (mapRows[y][x] === "@") {
        robotY = y;
        robotX = x;
      }
    }
  }

  const directions: { [key: string]: [number, number] } = {
    "^": [0, -1],
    v: [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
  };

  for (const move of moves) {
    const [dx, dy] = directions[move];

    let checkX = robotX + dx;
    let checkY = robotY + dy;

    if (checkY < 0 || checkY >= mapRows.length || checkX < 0 || checkX >= mapRows[0].length || mapRows[checkY][checkX] === "#") {
      continue; // blocked
    }

    if (mapRows[checkY][checkX] === ".") {
      // Move the robot
      mapRows[robotY][robotX] = ".";
      mapRows[checkY][checkX] = "@";
      robotX = checkX;
      robotY = checkY;
      continue;
    }

    // If next cell is a box, attempt to push
    if (mapRows[checkY][checkX] === "O") {
      // Collect all consecutive boxes in line
      const boxPositions: Array<[number, number]> = [];
      let pushX = checkX;
      let pushY = checkY;

      while (pushY >= 0 && pushY < mapRows.length && pushX >= 0 && pushX < mapRows[0].length && mapRows[pushY][pushX] === "O") {
        boxPositions.push([pushX, pushY]);
        pushX += dx;
        pushY += dy;
      }

      // Now pushX, pushY is the position after the last box
      // Check if we can push into it
      if (pushY < 0 || pushY >= mapRows.length || pushX < 0 || pushX >= mapRows[0].length || mapRows[pushY][pushX] !== ".") {
        // Can't push if next cell is not empty
        continue;
      }

      // Perform the push: move boxes from far to near
      // Start from the last box and move forward
      for (let i = boxPositions.length - 1; i >= 0; i--) {
        const [bx, by] = boxPositions[i];
        const newBoxX = bx + dx;
        const newBoxY = by + dy;
        mapRows[newBoxY][newBoxX] = "O";
        mapRows[by][bx] = ".";
      }

      // Move the robot
      mapRows[robotY][robotX] = ".";
      mapRows[robotY + dy][robotX + dx] = "@";
      robotX += dx;
      robotY += dy;
    }
  }

  // After all moves, compute GPS sum
  let sum = 0;
  for (let y = 0; y < mapRows.length; y++) {
    for (let x = 0; x < mapRows[y].length; x++) {
      if (mapRows[y][x] === "O") {
        sum += y * 100 + x;
      }
    }
  }

  return sum.toString();
}
