export function part1(input: unknown): string {
  const lines = (input as string).trim().split('\n');
  const grid = lines.map(line => line.split(''));
  const rows = grid.length;
  const cols = grid[0].length;
  
  let startRow = 0, startCol = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 'S') {
        startRow = r;
        startCol = c;
        break;
      }
    }
  }
  
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const targetSteps = 64;
  
  let currentPositions = new Set<string>();
  currentPositions.add(`${startRow},${startCol}`);
  
  for (let step = 0; step < targetSteps; step++) {
    const nextPositions = new Set<string>();
    
    for (const pos of currentPositions) {
      const [r, c] = pos.split(',').map(Number);
      
      for (const [dr, dc] of directions) {
        const newR = r + dr;
        const newC = c + dc;
        
        if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && 
            (grid[newR][newC] === '.' || grid[newR][newC] === 'S')) {
          nextPositions.add(`${newR},${newC}`);
        }
      }
    }
    
    currentPositions = nextPositions;
  }
  
  return currentPositions.size.toString();
}
