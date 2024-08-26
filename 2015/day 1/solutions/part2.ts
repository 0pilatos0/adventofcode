export function part2(input: string): string {
  let currentFloor = 0;
  let position = 0;

  const instructions = input.split("");

  for (const instruction of instructions) {
    if (instruction === "(") {
      currentFloor++;
    } else {
      currentFloor--;
    }

    position++;

    if (currentFloor === -1) {
      break;
    }
  }

  return position.toString();
}
