export function part1(input: string): string {
  const matrix = input.split("\r\n").map((line) => line.split(""));
  const height = matrix.length;
  const width = matrix[0].length;

  const wordToFind = "XMAS";
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
    [1, 1], // right down diagonal
    [1, -1], // left down diagonal
    [-1, -1], // left up diagonal
    [-1, 1], // right up diagonal
  ];
  let timesFound = 0;

  const isWordFound = (row: number, col: number, direction: number[]): boolean => {
    for (let i = 0; i < wordToFind.length; i++) {
      const newRow = row + i * direction[0];
      const newCol = col + i * direction[1];
      if (newRow < 0 || newRow >= height || newCol < 0 || newCol >= width || matrix[newRow][newCol] !== wordToFind[i]) {
        return false;
      }
    }
    return true;
  };

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (matrix[row][col] === wordToFind[0]) {
        for (const direction of directions) {
          if (isWordFound(row, col, direction)) {
            timesFound++;
          }
        }
      }
    }
  }

  return timesFound.toString();
}
