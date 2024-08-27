export function part1(input: string): string {
  const visitedHouses = new Set<string>();
  let x = 0;
  let y = 0;

  visitedHouses.add(`${x},${y}`);

  const directions = input.split("");
  for (const direction of directions) {
    switch (direction) {
      case "^":
        y++;
        break;
      case "v":
        y--;
        break;
      case ">":
        x++;
        break;
      case "<":
        x--;
        break;
    }
    visitedHouses.add(`${x},${y}`);
  }

  return visitedHouses.size.toString();
}
