export function part1(input: string): string {
  const instructions = input.split("\n");
  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];
  let x = 1;
  let y = 1;
  let code = "";

  for (const instruction of instructions) {
    for (const step of instruction) {
      if (step === "U" && y > 0) y--;
      if (step === "D" && y < 2) y++;
      if (step === "L" && x > 0) x--;
      if (step === "R" && x < 2) x++;
    }
    code += keypad[y][x];
  }

  return code;
}
