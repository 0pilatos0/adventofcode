// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(input: string): string {
  const instructions = input.split("\n");
  const keypad = [
    ["", "", "1", "", ""],
    ["", "2", "3", "4", ""],
    ["5", "6", "7", "8", "9"],
    ["", "A", "B", "C", ""],
    ["", "", "D", "", ""],
  ];
  let x = 0;
  let y = 2;
  let code = "";

  for (const instruction of instructions) {
    for (const step of instruction) {
      if (step === "U" && y > 0 && keypad[y - 1][x] !== "") y--;
      if (step === "D" && y < 4 && keypad[y + 1][x] !== "") y++;
      if (step === "L" && x > 0 && keypad[y][x - 1] !== "") x--;
      if (step === "R" && x < 4 && keypad[y][x + 1] !== "") x++;
    }
    code += keypad[y][x];
  }

  return code;
}
