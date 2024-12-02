export function part2(input: string): string {
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
    const lineVariants: number[][] = [];
    let foundValid = false;

    for (let i = 0; i < line.length; i++) {
      const lineVariant = line.slice();
      lineVariant.splice(i, 1);
      lineVariants.push(lineVariant);
    }

    lineVariants.push(line);

    for (const lineVariant of lineVariants) {
      const direction: "Ascending" | "Descending" = lineVariant[1] > lineVariant[0] ? "Ascending" : "Descending";

      let valid = true;

      for (let i = 1; i < lineVariant.length; i++) {
        if (!compare(lineVariant[i], lineVariant[i - 1], direction)) {
          valid = false;
          break;
        }
      }

      if (valid) {
        foundValid = true;
        break;
      }
    }

    if (foundValid) {
      safeReports++;
    }
  }

  return safeReports.toString();
}
