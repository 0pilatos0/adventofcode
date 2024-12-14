export function part1(input: string): string {
  const width = 101;
  const height = 103;
  const time = 100;
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

  const grid = Array.from({ length: height }, () => Array(width).fill(0));
  for (const { x, y, vx, vy } of robots) {
    let nx = (x + vx * time) % width;
    let ny = (y + vy * time) % height;
    if (nx < 0) nx += width;
    if (ny < 0) ny += height;
    grid[ny][nx]++;
  }

  // Calculate safety factor
  const midX = Math.floor(width / 2); // 101/2 = 50
  const midY = Math.floor(height / 2); // 103/2 = 51
  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (col === midX || row === midY) continue;
      const count = grid[row][col];
      if (count > 0) {
        if (col < midX && row < midY) q1 += count;
        else if (col > midX && row < midY) q2 += count;
        else if (col < midX && row > midY) q3 += count;
        else if (col > midX && row > midY) q4 += count;
      }
    }
  }

  const safetyFactor = q1 * q2 * q3 * q4;
  return String(safetyFactor);
}
