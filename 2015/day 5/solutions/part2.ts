export function part2(input: string): string {
  const lines = input.split("\n").filter((line) => line.length > 0);
  let niceCount = 0;

  for (const line of lines) {
    if (isNice(line)) {
      niceCount++;
    }
  }

  return niceCount.toString();
}

function isNice(line: string): boolean {
  let hasDoublePair = false;
  let hasRepeatingLetter = false;

  for (let i = 0; i < line.length - 2; i++) {
    if (line.slice(i + 2).includes(line.slice(i, i + 2))) {
      hasDoublePair = true;
    }

    if (line[i] === line[i + 2]) {
      hasRepeatingLetter = true;
    }
  }

  return hasDoublePair && hasRepeatingLetter;
}
