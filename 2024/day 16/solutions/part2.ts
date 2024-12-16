interface PQItem {
  cost: number;
  x: number;
  y: number;
  dir: number;
}

export function part2(input: string): string {
  const grid: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  let startX = 0,
    startY = 0,
    endX = 0,
    endY = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const val = grid[y][x];
      if (val === "S") {
        startX = x;
        startY = y;
      }
      if (val === "E") {
        endX = x;
        endY = y;
      }
    }
  }

  const DIRS = [
    { dx: 1, dy: 0 }, // East
    { dx: 0, dy: 1 }, // South
    { dx: -1, dy: 0 }, // West
    { dx: 0, dy: -1 }, // North
  ];

  const rows = grid.length;
  const cols = grid[0].length;
  const dist: number[][][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Array(4).fill(Infinity)));

  const pq: PQItem[] = [];
  dist[startY][startX][0] = 0;
  pqPush(pq, { cost: 0, x: startX, y: startY, dir: 0 });

  while (pq.length > 0) {
    const { cost, x, y, dir } = pqPop(pq);
    if (dist[y][x][dir] < cost) continue;
    if (x === endX && y === endY) {
    }

    {
      const nx = x + DIRS[dir].dx;
      const ny = y + DIRS[dir].dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        if (grid[ny][nx] !== "#") {
          const nCost = cost + 1;
          if (nCost < dist[ny][nx][dir]) {
            dist[ny][nx][dir] = nCost;
            pqPush(pq, { cost: nCost, x: nx, y: ny, dir });
          }
        }
      }
    }

    {
      const ndir = (dir + 3) % 4;
      const rotateCost = cost + 1000;
      if (rotateCost < dist[y][x][ndir]) {
        dist[y][x][ndir] = rotateCost;
        pqPush(pq, { cost: rotateCost, x, y, dir: ndir });
      }
    }

    {
      const ndir = (dir + 1) % 4;
      const rotateCost = cost + 1000;
      if (rotateCost < dist[y][x][ndir]) {
        dist[y][x][ndir] = rotateCost;
        pqPush(pq, { cost: rotateCost, x, y, dir: ndir });
      }
    }
  }

  const minCost = Math.min(...dist[endY][endX]);

  if (!isFinite(minCost)) {
    return "I don't know";
  }

  const onBestPath = Array.from({ length: rows }, () => Array(cols).fill(false));
  const visitedStates = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Array(4).fill(false)));

  const stack: Array<{ x: number; y: number; dir: number }> = [];

  for (let dir = 0; dir < 4; dir++) {
    if (dist[endY][endX][dir] === minCost) {
      stack.push({ x: endX, y: endY, dir });
      visitedStates[endY][endX][dir] = true;
      onBestPath[endY][endX] = true;
    }
  }

  while (stack.length > 0) {
    const { x, y, dir } = stack.pop()!;
    const currentCost = dist[y][x][dir];

    {
      const { dx, dy } = DIRS[dir];
      const px = x - dx;
      const py = y - dy;
      if (px >= 0 && px < cols && py >= 0 && py < rows && grid[py][px] !== "#") {
        if (dist[py][px][dir] === currentCost - 1) {
          if (!visitedStates[py][px][dir]) {
            visitedStates[py][px][dir] = true;
            onBestPath[py][px] = true;
            stack.push({ x: px, y: py, dir });
          }
        }
      }
    }

    {
      const leftDir = (dir + 1) % 4;
      if (dist[y][x][leftDir] === currentCost - 1000) {
        if (!visitedStates[y][x][leftDir]) {
          visitedStates[y][x][leftDir] = true;
          onBestPath[y][x] = true;
          stack.push({ x, y, dir: leftDir });
        }
      }

      const rightDir = (dir + 3) % 4;
      if (dist[y][x][rightDir] === currentCost - 1000) {
        if (!visitedStates[y][x][rightDir]) {
          visitedStates[y][x][rightDir] = true;
          onBestPath[y][x] = true;
          stack.push({ x, y, dir: rightDir });
        }
      }
    }
  }

  let count = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (onBestPath[y][x] && grid[y][x] !== "#") {
        count++;
      }
    }
  }

  return count.toString();
}

function pqPush(pq: PQItem[], item: PQItem): void {
  pq.push(item);
  let i = pq.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (pq[p].cost <= pq[i].cost) break;
    [pq[p], pq[i]] = [pq[i], pq[p]];
    i = p;
  }
}

function pqPop(pq: PQItem[]): PQItem {
  const top = pq[0];
  const last = pq.pop() as PQItem;
  if (pq.length > 0) {
    pq[0] = last;
    let i = 0;
    while (true) {
      const left = (i << 1) + 1;
      const right = left + 1;
      let smallest = i;
      if (left < pq.length && pq[left].cost < pq[smallest].cost) smallest = left;
      if (right < pq.length && pq[right].cost < pq[smallest].cost) smallest = right;
      if (smallest === i) break;
      [pq[i], pq[smallest]] = [pq[smallest], pq[i]];
      i = smallest;
    }
  }
  return top;
}
