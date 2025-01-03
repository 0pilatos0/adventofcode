export function part1(input: string): string {
  type Input = ReturnType<typeof parse>;
  type RegisterName = "a" | "b" | "c";

  function parse(input: string) {
    const [registers, program] = input.split("\r\n\r\n");
    const [a, b, c] = registers.split("\r\n").map((line) => BigInt(line.substring(12)));
    return {
      registers: { a, b, c } as Record<RegisterName, bigint>,
      instructions: program
        .substring(9)
        .split(",")
        .map((n) => BigInt(n)),
    };
  }

  const memoryKeys: RegisterName[] = ["a", "b", "c"];

  function runProgram({ registers, instructions }: Input) {
    const output: bigint[] = [];
    for (let i = 0; i < instructions.length; ) {
      const op = instructions[i];
      const literal = instructions[i + 1];
      const combo = instructions[i + 1] <= 3 ? instructions[i + 1] : registers[memoryKeys[Number(instructions[i + 1]) - 4]];

      switch (op) {
        case 0n:
          registers.a = registers.a / 2n ** combo;
          break;
        case 1n:
          registers.b ^= literal;
          break;
        case 2n:
          registers.b = combo % 8n;
          break;
        case 3n:
          if (registers.a !== 0n) {
            i = Number(literal);
            continue;
          }
          break;
        case 4n:
          registers.b ^= registers.c;
          break;
        case 5n:
          output.push(combo % 8n);
          break;
        case 6n:
          registers.b = registers.a / 2n ** combo;
          break;
        case 7n:
          registers.c = registers.a / 2n ** combo;
          break;
      }

      i += 2;
    }
    return { registers, output };
  }

  function partOne(input: Input) {
    return runProgram(input).output.join(",");
  }

  return partOne(parse(input)).toString();
}
