export function part1(input: string): string {
  //create 2d matrix of the input split by line and by character
  const matrix = input.split("\r\n").map((line) => line.split(""));
  const height = matrix.length;
  const width = matrix[0].length;

  const wordtofind = "XMAS";
  let timesFound = 0;

  const checkRightToLeft = (row: number, col: number) => {
    if (col + wordtofind.length > width) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row][col + i] !== wordtofind[i]) return false;
    }
    return true;
  };

  const checkLeftToRight = (row: number, col: number) => {
    if (col - wordtofind.length < 0) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row][col - i] !== wordtofind[i]) return false;
    }
    return true;
  };

  const checkTopToBottom = (row: number, col: number) => {
    if (row + wordtofind.length > height) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row + i][col] !== wordtofind[i]) return false;
    }
    return true;
  };

  const checkBottomToTop = (row: number, col: number) => {
    if (row - wordtofind.length < 0) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row - i][col] !== wordtofind[i]) return false;
    }
    return true;
  };

  const checkTopLeftToBottomRight = (row: number, col: number) => {
    if (row + wordtofind.length > height || col + wordtofind.length > width) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row + i][col + i] !== wordtofind[i]) return false;
    }
    return true;
  };

  const checkTopRightToBottomLeft = (row: number, col: number) => {
    if (row + wordtofind.length > height || col - wordtofind.length + 1 < 0) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row + i][col - i] !== wordtofind[i]) return false;
    }
    return true;
  };

  const checkBottomLeftToTopRight = (row: number, col: number) => {
    if (row - wordtofind.length + 1 < 0 || col + wordtofind.length > width) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row - i][col + i] !== wordtofind[i]) return false;
    }
    return true;
  };

  const checkBottomRightToTopLeft = (row: number, col: number) => {
    if (row - wordtofind.length + 1 < 0 || col - wordtofind.length + 1 < 0) return false;
    for (let i = 0; i < wordtofind.length; i++) {
      if (matrix[row - i][col - i] !== wordtofind[i]) return false;
    }
    return true;
  };

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (checkRightToLeft(row, col)) timesFound++;
      if (checkLeftToRight(row, col)) timesFound++;
      if (checkTopToBottom(row, col)) timesFound++;
      if (checkBottomToTop(row, col)) timesFound++;
      if (checkTopLeftToBottomRight(row, col)) timesFound++;
      if (checkTopRightToBottomLeft(row, col)) timesFound++;
      if (checkBottomLeftToTopRight(row, col)) timesFound++;
      if (checkBottomRightToTopLeft(row, col)) timesFound++;
    }
  }

  return timesFound.toString();
}
