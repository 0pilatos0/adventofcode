export function part2(input: string): string {
  let totalPower = 0;

  type game = {
    gameId: number;
    minRed: number;
    minGreen: number;
    minBlue: number;
    raw: string;
  };

  const lines = input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const game: game = {
      gameId: parseInt(line.split(" ")[1].split(":")[0]),
      raw: line,
      minBlue: 0,
      minGreen: 0,
      minRed: 0,
    };

    const partsObj = line.split(": ")[1].split(/[;,]/g);
    partsObj.forEach((part) => {
      const partArr = part.trim().split(" ");
      const partColor = partArr[1];
      const partNumber = parseInt(partArr[0]);

      if (partColor === "red" && partNumber > game.minRed) {
        game.minRed = partNumber;
      }
      if (partColor === "green" && partNumber > game.minGreen) {
        game.minGreen = partNumber;
      }
      if (partColor === "blue" && partNumber > game.minBlue) {
        game.minBlue = partNumber;
      }
    });

    let localPower = game.minRed * game.minGreen * game.minBlue;
    totalPower += localPower;
  }

  return totalPower.toString();
}
