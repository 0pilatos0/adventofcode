export function part2(input: string): string {
  const matrix = input.split("\n").map((line) => line.split(""));
  const height = matrix.length;
  const width = matrix[0].length;
  let timesFound = 0;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (matrix[row][col] != "A") continue;
      let charTopLeft = row > 0 && col > 0 ? matrix[row - 1][col - 1] : "";
      let charBottomRight = row < height - 1 && col < width - 1 ? matrix[row + 1][col + 1] : "";
      let charTopRight = row > 0 && col < width - 1 ? matrix[row - 1][col + 1] : "";
      let charBottomLeft = row < height - 1 && col > 0 ? matrix[row + 1][col - 1] : "";

      if (charTopLeft == "" || charBottomRight == "" || charTopRight == "" || charBottomLeft == "") continue;

      switch (charTopLeft + charBottomRight + charTopRight + charBottomLeft) {
        case "MSMS":
        case "MSSM":
        case "SMMS":
        case "SMSM":
          timesFound++;
          break;
      }
    }
  }

  return timesFound.toString();
}
