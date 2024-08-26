export function part2(input: string): string {
  const lines = input.split("\n");

  const instructions = lines.map((line) => {
    const [l, w, h] = line.split("x").map(Number);
    return [l, w, h];
  });

  let total = 0;

  for (const [l, w, h] of instructions) {
    const cubicFeet = l * w * h;
    const perimeter = 2 * (l + w + h - Math.max(l, w, h));
    total += cubicFeet + perimeter;
  }

  return total.toString();
}
