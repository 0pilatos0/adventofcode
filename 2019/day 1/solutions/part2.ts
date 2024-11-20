export function part2(input: string): string {
  const lines = input.split("\n");

  let totalFuel = 0;
  for (const line of lines) {
    const mass = parseInt(line, 10);
    totalFuel += calculateFuel(mass);
  }

  return totalFuel.toString();
}

const calculateFuel = (mass: number): number => {
  const fuel = Math.floor(mass / 3) - 2;
  if (fuel <= 0) {
    return 0;
  }
  return fuel + calculateFuel(fuel);
};
