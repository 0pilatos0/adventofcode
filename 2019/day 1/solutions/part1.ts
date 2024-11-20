export function part1(input: string): string {
  const lines = input.split("\n");

  let totalFuel = 0;
  for (const line of lines) {
    const mass = parseInt(line, 10);
    totalFuel += Math.floor(mass / 3) - 2;
  }

  return totalFuel.toString();
}
