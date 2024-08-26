export function part1(input: string): string {
  let currentFloor = 0;

  const instructions = input.split("");

  for (const instruction of instructions) {
    if (instruction === "(") {
      currentFloor++;
    } else {
      currentFloor--;
    }
  }

  return currentFloor.toString();
}
