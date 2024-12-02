export function part1(input: string): string {
  const lines = input.split("\n").map((line) => line.split(" ").map((x) => parseInt(x, 10)));
  let safeReports = 0;

  for (const line of lines) {
    const direction: "Ascending" | "Descending" = line[1] > line[0] ? "Ascending" : "Descending";
    let valid = true;
    for (let i = 1; i < line.length; i++) {
      const diff = Math.abs(line[i] - line[i - 1]);
      if (diff < 1 || diff > 3) {
        valid = false;
        break;
      }

      //heck if the direction is still correct
      if (direction === "Ascending" && line[i] < line[i - 1]) {
        valid = false;
        break;
      } else if (direction === "Descending" && line[i] > line[i - 1]) {
        valid = false;
        break;
      }
    }

    if (valid) {
      safeReports++;
    }
  }

  return safeReports.toString();
}
