export function part1(input: string): string {
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
  const vowels = ["a", "e", "i", "o", "u"];
  const forbidden = ["ab", "cd", "pq", "xy"];

  let vowelCount = 0;
  let hasDoubleLetter = false;
  let hasForbidden = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (vowels.includes(char)) {
      vowelCount++;
    }

    if (i > 0 && char === line[i - 1]) {
      hasDoubleLetter = true;
    }

    if (forbidden.includes(line.slice(i - 1, i + 1))) {
      hasForbidden = true;
    }
  }

  return vowelCount >= 3 && hasDoubleLetter && !hasForbidden;
}
