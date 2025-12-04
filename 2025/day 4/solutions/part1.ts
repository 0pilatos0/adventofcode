export function part1(input: string): string {
  const grid = input.trim().split('\n').map((grid) => {
    return grid.split('')
  });

  let result = 0;

  function neighBoring(x: number, y: number) {
    const deltas = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0],           [1, 0],
      [-1, 1],  [0, 1],  [1, 1],
    ];

    //how many neighbors are @ 
    let count = 0;
    for (const [dx, dy] of deltas) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length) {
        if (grid[ny][nx] === '@') {
          count++;
        }
      }
    }
    return count;
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (cell === '@') { 
        const neighbors = neighBoring(x, y);

        if (neighbors < 4 )
          result++;

      }
    }
  }


  return result.toString();
}
