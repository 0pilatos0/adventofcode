export function part1(input: string): string {
  const lines = input.split("\n").map((line) => line.split(" ").map((x) => parseInt(x, 10)));
  let safeReports = 0;

  const validDiff = (diff: number): boolean => diff >= 1 && diff <= 3;
  const validAccending = (valueA: number, valueB: number): boolean => valueA < valueB;
  const validDescending = (valueA: number, valueB: number): boolean => valueA > valueB;

  function compare(valueA: number, valueB: number, direction: "Ascending" | "Descending"): boolean {
    const diff = Math.abs(valueA - valueB);
    if (!validDiff(diff)) {
      return false;
    }

    if ((direction === "Ascending" && validAccending(valueA, valueB)) || (direction === "Descending" && validDescending(valueA, valueB))) {
      return false;
    }

    return true;
  }

  for (const line of lines) {
    const direction: "Ascending" | "Descending" = line[1] > line[0] ? "Ascending" : "Descending";
    let valid = true;

    for (let i = 1; i < line.length; i++) {
      if (!compare(line[i], line[i - 1], direction)) {
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
