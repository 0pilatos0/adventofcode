type Point = [x: number, y: number];
type Line = [start: Point, end: Point];
type Parts = Map<number, Line[]>;
type Symbols = Map<string, Point[]>;

export function part1(input: string): string {
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

    for (const match of line.matchAll(/[^\.\d]/g)) {
      if (match.index === undefined) continue;
      const symbol = String(match);
      symbols.set(symbol, [...(symbols.get(symbol) || []), [match.index, y]]);
    }
  }

  let sum = 0;

  const symbolPoints = [...symbols.values()].flat();

  for (const [number, instances] of parts.entries()) {
    for (const [[x1, y], [x2]] of instances) {
      const isPartNumber = symbolPoints.some(([xs, ys]) => {
        const xRange = xs >= x1 - 1 && xs <= x2 + 1;
        const yRange = ys >= y - 1 && ys <= y + 1;
        return xRange && yRange;
      });

      if (!isPartNumber) continue;

      sum += number;
    }
  }

  return sum.toString();
}
