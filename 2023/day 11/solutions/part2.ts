type Point = [number, number];

export function part2(input: string): string {
  const lines = input.trim().split("\n");
  const points: Point[] = [];

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === "#") {
        points.push([x, y]);
      }
    }
  }

  const expandedPoints = expand(points, 1_000_000);
  const sumDistances = sumPairDistances(expandedPoints);
  return sumDistances.toString();
}

function expand(points: Point[], factor: number): Point[] {
  const nonemptyYs = new Set<number>();
  const nonemptyXs = new Set<number>();
  let maxY = 0;
  let maxX = 0;

  for (const [x, y] of points) {
    nonemptyXs.add(x);
    nonemptyYs.add(y);
    maxY = Math.max(maxY, y);
    maxX = Math.max(maxX, x);
  }

  const prefixSumXs: number[] = new Array(maxX + 1).fill(0);
  const prefixSumYs: number[] = new Array(maxY + 1).fill(0);

  for (let x = 0; x <= maxX; x++) {
    const previousSumX = prefixSumXs[x - 1] || 0;
    const isEmptyX = !nonemptyXs.has(x);
    prefixSumXs[x] = previousSumX + (isEmptyX ? 1 : 0);
  }

  for (let y = 0; y <= maxY; y++) {
    const previousSumY = prefixSumYs[y - 1] || 0;
    const isEmptyY = !nonemptyYs.has(y);
    prefixSumYs[y] = previousSumY + (isEmptyY ? 1 : 0);
  }

  return points.map(([px, py]) => {
    const prefixSumX = prefixSumXs[px];
    const prefixSumY = prefixSumYs[py];
    const newX = px + prefixSumX * (factor - 1);
    const newY = py + prefixSumY * (factor - 1);
    return [newX, newY];
  });
}

function manhattanDistance([ax, ay]: Point, [bx, by]: Point): number {
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

function sumPairDistances(points: Point[]): number {
  const considered = new Set<string>();
  let sum = 0;

  for (let i = 0; i < points.length; i++) {
    const a = points[i];

    for (let j = i + 1; j < points.length; j++) {
      const b = points[j];

      const [sortedA, sortedB] = [a, b].sort((p1, p2) => {
        if (p1[0] === p2[0]) {
          return p1[1] - p2[1];
        }
        return p1[0] - p2[0];
      });

      const key = `${sortedA[0]}-${sortedA[1]}:${sortedB[0]}-${sortedB[1]}`;

      if (considered.has(key)) {
        continue;
      }

      sum += manhattanDistance(a, b);
      considered.add(key);
    }
  }

  return sum;
}
