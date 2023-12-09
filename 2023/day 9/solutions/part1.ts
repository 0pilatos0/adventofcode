export function part1(input: string): string {
  const lines = input
    .split("\n")
    .map((line) => line.split(" ").map((item) => parseInt(item)));

  const result = lines.map(extrapolate).reduce((acc, x) => acc + x, 0);
  return result.toString();
}

function extrapolate(listOfNumbers: number[]): number {
  const table: number[][] = [listOfNumbers];

  for (let i = 1; hasNonZeroValues(table[i - 1]); i++) {
    table.push(Array(listOfNumbers.length));

    for (let j = i; j < listOfNumbers.length; j++) {
      table[i][j] = calculateDifference(table[i - 1][j], table[i - 1][j - 1]);
    }
  }

  return calculateSumOfLastElements(table);
}

function hasNonZeroValues(numbers: number[]): boolean {
  return numbers.some((value) => value !== 0);
}

function calculateDifference(a: number, b: number): number {
  return a - b;
}

function calculateSumOfLastElements(table: number[][]): number {
  return table.reduce((acc, row) => acc + row.at(-1)!, 0);
}
