export function part1(input: string): string {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .map((line) => line.split(/\s+/))
    .map((line) => line.map((item) => parseInt(item, 10)));

  let posible = 0;

  for (const line of lines) {
    const [a, b, c] = line.toSorted((a, b) => a - b);
    if (a + b > c) {
      posible++;
    }
  }

  return posible.toString();
}
