export function part2(input: string): string {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.split(/\s+/))
    .map((line) => line.map((item) => parseInt(item, 10)));

  let posible = 0;

  let newLines = [] as number[][];

  for (let i = 0; i < lines.length; i += 3) {
    const [a1, b1, c1] = lines[i];
    const [a2, b2, c2] = lines[i + 1];
    const [a3, b3, c3] = lines[i + 2];

    newLines.push([a1, a2, a3]);
    newLines.push([b1, b2, b3]);
    newLines.push([c1, c2, c3]);
  }

  for (const line of newLines) {
    const [a, b, c] = line.toSorted((a, b) => a - b);
    if (a + b > c) {
      posible++;
    }
  }
  return posible.toString();
}
