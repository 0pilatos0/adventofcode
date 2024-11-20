const RESULT_TARGET = 19690720;

export function part2(input: string): string {
  const opCodes = input.split(",").map((x) => parseInt(x, 10));

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const opCodesCopy = [...opCodes];
      const result = calculateOpCodes(opCodesCopy, noun, verb);

      if (result === RESULT_TARGET) return (100 * noun + verb).toString();
    }
  }

  return "Unable to calculate the correct noun and verb";
}

function calculateOpCodes(opCodes: number[], noun: number, verb: number) {
  opCodes[1] = noun;
  opCodes[2] = verb;

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

  return opCodes[0];
}
