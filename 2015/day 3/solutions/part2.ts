export function part2(input: string): string {
  const visitedHouses = new Set<string>();
  let santaX = 0;
  let santaY = 0;
  let robotSantaX = 0;
  let robotSantaY = 0;

  visitedHouses.add(`${santaX},${santaY}`);

  const directions = input.split("");

  let even = true;
  for (const direction of directions) {
    if (even) {
      switch (direction) {
        case "^":
          santaY++;
          break;
        case "v":
          santaY--;
          break;
        case ">":
          santaX++;
          break;
        case "<":
          santaX--;
          break;
      }
      visitedHouses.add(`${santaX},${santaY}`);
    } else {
      switch (direction) {
        case "^":
          robotSantaY++;
          break;
        case "v":
          robotSantaY--;
          break;
        case ">":
          robotSantaX++;
          break;
        case "<":
          robotSantaX--;
          break;
      }
      visitedHouses.add(`${robotSantaX},${robotSantaY}`);
    }

    even = !even;
  }

  return visitedHouses.size.toString();
}
