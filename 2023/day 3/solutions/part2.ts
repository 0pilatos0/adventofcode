type Point = [x: number, y: number];
type Line = [start: Point, end: Point];
type Parts = Map<number, Line[]>;
type Symbols = Map<string, Point[]>;

export function part2(input: string): string {
  //ALL COORDS
  const parts: Parts = new Map();
  const symbols: Symbols = new Map();

  for (const [y, line] of input.split("\n").entries()) {
    for (const match of line.matchAll(/\d+/g)) {
      const number = String(match);
      const x = match.index!;
      parts.set(+number, [
        ...(parts.get(+number) || []),
        [
          [x, y],
          [x + (number.length - 1), y],
        ],
      ]);
    }

    for (const match of line.matchAll(/[^.\d]/g)) {
      if (match.index === undefined) continue;
      const symbol = String(match);
      symbols.set(symbol, [...(symbols.get(symbol) ?? []), [match.index, y]]);
    }
  }

  let sum = 0;

  const gears = symbols.get("*")!;

  const partsArray = [...parts.entries()];

  for (const [xg, yg] of gears) {
    const partsNextTo: number[] = [];

    for (const [number, instances] of partsArray) {
      for (const [[x1, y], [x2]] of instances) {
        const xRange = xg >= x1 - 1 && xg <= x2 + 1;
        const yRange = yg >= y - 1 && yg <= y + 1;
        if (xRange && yRange) partsNextTo.push(number);
      }
    }

    if (partsNextTo.length !== 2) continue;

    sum += partsNextTo.reduce((a, b) => a * b, 1);
  }

  return sum.toString();
}
