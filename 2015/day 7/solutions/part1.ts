export function part1(input: string): string {
  const lines: string[] = input.split("\r\n");
  const wireInstructions: Map<string, string> = new Map();
  const wireSignals: Map<string, number> = new Map();

  lines.forEach((line: string) => {
    const [instruction, wire] = line.split(" -> ");
    wireInstructions.set(wire, instruction);
  });
  // Recursive function to evaluate the value of a wire
  function evaluate(wire: string): number {
    // If wire is a number, return it as an integer
    if (!isNaN(Number(wire))) {
      return parseInt(wire, 10);
    }

    // If we already have the value calculated, return it
    if (wireSignals.has(wire)) {
      return wireSignals.get(wire)!;
    }

    const instruction = wireInstructions.get(wire);
    let value: number = 0;

    if (!instruction) {
      throw new Error(`No instruction found for wire: ${wire}`);
    }

    const parts: string[] = instruction.split(" ");
    if (parts.length === 1) {
      // Simple assignment (e.g., "123 -> x" or "y -> z")
      value = evaluate(parts[0]);
    } else if (parts.length === 2) {
      // NOT operation (e.g., "NOT x -> h")
      const operand = evaluate(parts[1]);
      value = ~operand & 0xffff; // Bitwise NOT, limited to 16 bits
    } else if (parts.length === 3) {
      // Binary operations (e.g., "x AND y -> d", "p LSHIFT 2 -> q")
      const [left, op, right] = parts;
      const leftVal = evaluate(left);
      const rightVal = evaluate(right);

      switch (op) {
        case "AND":
          value = leftVal & rightVal;
          break;
        case "OR":
          value = leftVal | rightVal;
          break;
        case "LSHIFT":
          value = leftVal << rightVal;
          break;
        case "RSHIFT":
          value = leftVal >> rightVal;
          break;
        default:
          throw new Error(`Unknown operation: ${op}`);
      }
    }

    // Cache the calculated value
    wireSignals.set(wire, value);
    return value;
  }

  // Get the value for wire 'a'
  return evaluate("a").toString();
}
