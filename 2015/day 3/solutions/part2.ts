export function part2(input: string): string {
  const visitedHouses = new Set<string>();
  const players = [
    [0, 0], //santa
    [0, 0], //robot-santa
  ];

  visitedHouses.add(`${players[0][0]},${players[0][1]}`);

  const directions = input.split("");
  let currentPlayer = 0;

  for (const direction of directions) {
    switch (direction) {
      case "^":
        players[currentPlayer][1]++;
        break;
      case "v":
        players[currentPlayer][1]--;
        break;
      case ">":
        players[currentPlayer][0]++;
        break;
      case "<":
        players[currentPlayer][0]--;
        break;
    }

    visitedHouses.add(`${players[currentPlayer][0]},${players[currentPlayer][1]}`);
    currentPlayer = currentPlayer === 0 ? 1 : 0;
  }

  return visitedHouses.size.toString();
}
