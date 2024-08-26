export function part1(input: string): string {
  const lines = input.split("\n");

  const instructions = lines.map((line) => {
    const [l, w, h] = line.split("x").map(Number);
    return [l, w, h];
  });

  let total = 0;

  for (const [l, w, h] of instructions) {
    let assignmentTotal = 0;

    const lResult = 2 * l * w;
    const wResult = 2 * w * h;
    const hResult = 2 * h * l;

    assignmentTotal += lResult + wResult + hResult;

    total += assignmentTotal;

    const slack = Math.min(l * w, w * h, h * l);
    total += slack;
  }

  return total.toString();
}
