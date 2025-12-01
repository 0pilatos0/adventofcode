export function part2(input: string): string {
  type Instruction = {
    direction: "L" | "R";
    steps: number;
  }

  const instructions = input.split("\n").map(line => line.trim()).filter(line => line.length > 0).map(line => {
    const match = line.match(/^(L|R)(\d+)$/)!;
    return {
      direction: match[1] as "L" | "R",
      steps: parseInt(match[2], 10),
    } as Instruction;
  });

  const DAIL_MIN_POSITION = 0;
  const DAIL_MAX_POSITION = 99;

  const START_POSITION = 50;
  let passedZero = 0;

  let currentPosition = START_POSITION;
  for (const instruction of instructions) {
    if (instruction.direction === "L") {
      for (let step = 0; step < instruction.steps; step++) {
        currentPosition--;
        if (currentPosition < DAIL_MIN_POSITION) {
          currentPosition = DAIL_MAX_POSITION;
        }
        if (currentPosition === 0) {
          passedZero++;
        }
      }
    } else if (instruction.direction === "R") {
      for (let step = 0; step < instruction.steps; step++) {
        currentPosition++;
        if (currentPosition > DAIL_MAX_POSITION) {
          currentPosition = DAIL_MIN_POSITION;
        }
        if (currentPosition === 0) {
          passedZero++;
        }
      }
    }
  }

  return passedZero.toString();
}
