export function part1(input: string): string {
  const opCodes = input.split(",").map((x) => parseInt(x, 10));
  opCodes[1] = 12;
  opCodes[2] = 2;

  let position = 0;

  while (opCodes[position] !== 99) {
    const opCode = opCodes[position];
    const input1 = opCodes[opCodes[position + 1]];
    const input2 = opCodes[opCodes[position + 2]];
    const outputPosition = opCodes[position + 3];

    if (opCode === 1) {
      opCodes[outputPosition] = input1 + input2;
    } else if (opCode === 2) {
      opCodes[outputPosition] = input1 * input2;
    } else {
      throw new Error("Unknown opcode");
    }

    position += 4;
  }

  return opCodes[0].toString();
}
