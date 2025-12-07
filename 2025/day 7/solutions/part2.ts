export function part2(input: string): string {
  const SPLIT_POINT = "^";
  const START_MARKER = "S";

  const map = input.toString().split("\n").map(line => line.split(""));
  const counts = map.map(row => row.map(_ => 0));

  // Find start position and initialize with 1 timeline
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === START_MARKER) {
        counts[y][x] = 1;
        break;
      }
    }
  }

  // Propagate timeline counts row by row
  for (let y = 0; y < map.length - 1; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const numTimelines = counts[y][x];

      if (numTimelines > 0) {
        if (map[y + 1][x] === SPLIT_POINT) {
          // Each timeline splits into 2: one goes left, one goes right
          counts[y + 1][x - 1] += numTimelines;
          counts[y + 1][x + 1] += numTimelines;
        } else {
          // All timelines continue straight down
          counts[y + 1][x] += numTimelines;
        }
      }
    }
  }

  // Sum all timelines in the last row
  const lastRow = counts[counts.length - 1];
  const totalTimelines = lastRow.reduce((sum, count) => sum + count, 0);

  return totalTimelines.toString();
}