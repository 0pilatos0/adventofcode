export function part2(input: string): string {
  function solve(input: string) {
    const rocks = input
      .trim()
      .split("\r\n")
      .map((line) => line.split(",").map(Number));

    function hasPath(blockedPoints: number[][]) {
      const grid = Array(71)
        .fill(false)
        .map(() => Array(71).fill(false));
      for (const [x, y] of blockedPoints) {
        grid[y][x] = true;
      }

      const queue = [[0, 0]];
      const visited = new Set(["0,0"]);

      while (queue.length) {
        const point = queue.shift();
        if (!point) continue;
        const [x, y] = point;

        if (x === 70 && y === 70) return true;

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
          queue.push([newX, newY]);
        }
      }

      return false;
    }

    let left = 0;
    let right = rocks.length;

    while (left < right - 1) {
      const mid = Math.floor((left + right) / 2);
      if (hasPath(rocks.slice(0, mid))) {
        left = mid;
      } else {
        right = mid;
      }
    }

    return rocks[left][0] + "," + rocks[left][1];
  }

  return solve(input);
}
