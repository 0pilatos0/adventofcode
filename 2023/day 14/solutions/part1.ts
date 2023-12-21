export function part1(input: string): string {
  const lines = input.split("\n").map((line) => line.split(""));

  let sum = 0;
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i][j] != "O") {
        continue;
      }

      let position = i - 1;
      while (position >= 0 && lines[position][j] == ".") {
        position--;
      }

      if (position < i - 1) {
        lines[position + 1][j] = "O";
        lines[i][j] = ".";
      }

      sum += lines.length - (position + 1);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i].join(" "));
  }

  return sum.toString();
}
