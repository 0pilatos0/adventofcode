export function part2(input: string): string {
  const lines = input.split("\n").map((line) => line.split(" ").map((x) => parseInt(x, 10)));
  let safeReports = 0;

  for (const line of lines) {
    const direction: "Ascending" | "Descending" = line[1] > line[0] ? "Ascending" : "Descending";
    let valid = true;
    let usedSkip = false;
    for (let i = 1; i < line.length; i++) {
      const diff = Math.abs(line[i] - line[i - 1]);
      if (diff < 1 || diff > 3) {
        const diffWhileSkipping = Math.abs(line[i + 1] - line[i - 1]);

        if (diffWhileSkipping < 1 || diffWhileSkipping > 3 || usedSkip) {
          valid = false;
          break;
        }

        usedSkip = true;
      }

      if (direction === "Ascending" && line[i] < line[i - 1]) {
        if (line[i + 1] < line[i - 1] || usedSkip) {
          valid = false;
          break;
        }

        usedSkip = true;
      } else if (direction === "Descending" && line[i] > line[i - 1]) {
        if (line[i + 1] > line[i - 1] || usedSkip) {
          valid = false;
          break;
        }

        usedSkip = true;
      }
    }

    if (valid) {
      safeReports++;
    }
  }

  return safeReports.toString();
}
