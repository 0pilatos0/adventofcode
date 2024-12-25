export function part1(input: string): string {
  const keys: number[][] = [];
  const locks: number[][] = [];

  const parseInput = (input: string) => {
    return input
      .trim()
      .split("\r\n\r\n")
      .map((lines) => lines.split("\r\n"));
  };

  const getHeights = (grid: string[], isKey: boolean): number[] => {
    const heights: number[] = [];
    for (let x = 0; x < grid[0].length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (isKey && grid[y][x] === "#") {
          heights.push(grid.length - y - 1);
          break;
        }
        if (!isKey && grid[y][x] === ".") {
          heights.push(y - 1);
          break;
        }
      }
    }
    return heights;
  };

  const grids = parseInput(input);
  grids.forEach((grid) => {
    const isKey = grid[0].split("").every((char) => char === ".");
    const heights = getHeights(grid, isKey);
    if (isKey) keys.push(heights);
    else locks.push(heights);
  });

  let count = 0;
  for (let i = 0; i < locks.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      let valid = true;
      for (let k = 0; k < locks[i].length; k++) {
        if (locks[i][k] + keys[j][k] >= 6) {
          valid = false;
          break;
        }
      }
      if (valid) count++;
    }
  }

  return count.toString();
}
