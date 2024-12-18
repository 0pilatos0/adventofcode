export function part1(input: string): string {
  function solve(input: string) {
    const grid = Array(71)
      .fill(false)
      .map(() => Array(71).fill(false));
    const rocks = input
      .trim()
      .split("\r\n")
      .map((line) => line.split(",").map(Number))
      .slice(0, 1024);

    for (const [x, y] of rocks) {
      grid[y][x] = true;
    }

    const queue = [[0, 0, 0]];
    const visited = new Set(["0,0"]);

    while (queue.length) {
      const current = queue.shift();
      if (!current) continue;
      const [x, y, steps] = current;

      if (x === 70 && y === 70) {
        return steps;
      }

      for (const [dx, dy] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const newX = x + dx;
        const newY = y + dy;

        if (newX < 0 || newX > 70 || newY < 0 || newY > 70) continue;
        if (grid[newY][newX]) continue;

        const key = `${newX},${newY}`;
        if (visited.has(key)) continue;

        visited.add(key);
        queue.push([newX, newY, steps + 1]);
      }
    }

    return -1;
  }

  return solve(input).toString();
}
