export function part1(input: string): string {
  const grid = input
    .trim()
    .split("\n")
    .map((line) =>
      line
        .trim()
        .split("")
        .map((ch) => parseInt(ch, 10))
    );
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [1, 0], // omlaag
    [-1, 0], // omhoog
    [0, 1], // rechts
    [0, -1], // links
  ];

  function findReachableNinesFromTrailhead(sr: number, sc: number): number {
    const visited = new Set<string>();
    const queue: [number, number, number][] = [];
    queue.push([sr, sc, 0]);
    visited.add(`${sr},${sc},0`);

    const foundNines = new Set<string>();

    while (queue.length > 0) {
      const [r, c, h] = queue.shift()!;
      if (h === 9) {
        foundNines.add(`${r},${c}`);
        continue;
      }

      const nextHeight = h + 1;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
          continue;
        }
        if (grid[nr][nc] === nextHeight) {
          const stateKey = `${nr},${nc},${nextHeight}`;
          if (!visited.has(stateKey)) {
            visited.add(stateKey);
            queue.push([nr, nc, nextHeight]);
          }
        }
      }
    }

    return foundNines.size;
  }

  const trailheads: [number, number][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        trailheads.push([r, c]);
      }
    }
  }

  let sumOfScores = 0;
  for (const [r, c] of trailheads) {
    const score = findReachableNinesFromTrailhead(r, c);
    sumOfScores += score;
  }

  return sumOfScores.toString();
}
