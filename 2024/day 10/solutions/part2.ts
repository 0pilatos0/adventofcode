export function part2(input: string): string {
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

  const memo = Array.from({ length: rows }, () => Array(cols).fill(-1));

  function ways(r: number, c: number): number {
    if (memo[r][c] !== -1) {
      return memo[r][c];
    }

    const h = grid[r][c];
    if (h === 9) {
      memo[r][c] = 1;
      return 1;
    }

    let count = 0;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) {
        continue;
      }
      if (grid[nr][nc] === h + 1) {
        count += ways(nr, nc);
      }
    }

    memo[r][c] = count;
    return count;
  }

  let totalRating = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        totalRating += ways(r, c);
      }
    }
  }

  return totalRating.toString();
}
