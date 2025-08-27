export function part2(input: unknown): string {
  const lines = (input as string).trim().split('\n');
  const grid = lines.map(line => line.split(''));
  const size = grid.length;
  const center = Math.floor(size / 2);
  
  function findStart(): [number, number] {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 'S') {
          return [r, c];
        }
      }
    }
    return [center, center];
  }
  
  function countPositions(startR: number, startC: number, maxSteps: number): [number, number] {
    const visited = new Set<string>();
    const queue: [number, number, number][] = [[startR, startC, 0]];
    visited.add(`${startR},${startC}`);
    
    let evenCount = 0;
    let oddCount = 0;
    
    while (queue.length > 0) {
      const [r, c, steps] = queue.shift()!;
      
      if (steps % 2 === 0) evenCount++;
      else oddCount++;
      
      if (steps === maxSteps) continue;
      
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        const key = `${nr},${nc}`;
        
        if (nr >= 0 && nr < size && nc >= 0 && nc < size && 
            !visited.has(key) && (grid[nr][nc] === '.' || grid[nr][nc] === 'S')) {
          visited.add(key);
          queue.push([nr, nc, steps + 1]);
        }
      }
    }
    
    return [evenCount, oddCount];
  }
  
  const [startR, startC] = findStart();
  const targetSteps = 26501365;
  const n = Math.floor(targetSteps / size);
  const remainder = targetSteps % size;
  
  const [evenFull, oddFull] = countPositions(startR, startC, size * 2);
  
  const [evenCorner, oddCorner] = countPositions(startR, startC, size - 1);
  
  let result = 0;
  
  if (targetSteps % 2 === 0) {
    result += (n + 1) * (n + 1) * evenFull + n * n * oddFull;
  } else {
    result += (n + 1) * (n + 1) * oddFull + n * n * evenFull;
  }
  
  if (targetSteps % 2 === 0) {
    result -= (n + 1) * oddCorner;
    result += n * evenCorner;
  } else {
    result -= (n + 1) * evenCorner;
    result += n * oddCorner;
  }
  
  return result.toString();
}
