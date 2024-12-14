export function part2(input: string): string {
  const width = 101;
  const height = 103;
  const lines = input.trim().split("\n");

  const robots: { x: number; y: number; vx: number; vy: number }[] = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    const [pPart, vPart] = line.split(" ");
    const [pxStr, pyStr] = pPart.replace("p=", "").split(",");
    const [vxStr, vyStr] = vPart.replace("v=", "").split(",");
    robots.push({
      x: parseInt(pxStr, 10),
      y: parseInt(pyStr, 10),
      vx: parseInt(vxStr, 10),
      vy: parseInt(vyStr, 10),
    });
  }

  function hasChristmasTree(grid: number[][]): boolean {
    for (let r = 0; r < height; r++) {
      let count = 0;
      for (let c = 0; c < width; c++) {
        if (grid[r][c] > 0) {
          count++;
          if (count > 10) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }
    return false;
  }

  let seconds = 0;
  while (true) {
    const grid = Array.from({ length: height }, () => Array(width).fill(0));
    for (const { x, y, vx, vy } of robots) {
      let nx = (x + vx * seconds) % width;
      let ny = (y + vy * seconds) % height;
      if (nx < 0) nx += width;
      if (ny < 0) ny += height;
      grid[ny][nx]++;
    }

    if (hasChristmasTree(grid)) {
      return String(seconds);
    }

    seconds++;
  }
}
