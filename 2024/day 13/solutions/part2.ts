export function part2(input: string): string {
  const OFFSET = 10000000000000;
  const lines = input
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const machines = [];
  for (let i = 0; i < lines.length; i += 3) {
    const aLine = lines[i];
    const bLine = lines[i + 1];
    const pLine = lines[i + 2];

    const aMatch = /Button A:\s*X\+(\d+),\s*Y\+(\d+)/.exec(aLine);
    const bMatch = /Button B:\s*X\+(\d+),\s*Y\+(\d+)/.exec(bLine);
    const pMatch = /Prize:\s*X=(\d+),\s*Y=(\d+)/.exec(pLine);

    if (!aMatch || !bMatch || !pMatch) {
      continue;
    }

    const Ax = parseInt(aMatch[1], 10);
    const Ay = parseInt(aMatch[2], 10);
    const Bx = parseInt(bMatch[1], 10);
    const By = parseInt(bMatch[2], 10);
    const Px = parseInt(pMatch[1], 10);
    const Py = parseInt(pMatch[2], 10);

    machines.push({ Ax, Ay, Bx, By, Px, Py });
  }

  let totalCost = 0;
  let solvableCount = 0;

  for (const m of machines) {
    const { Ax, Ay, Bx, By, Px, Py } = m;
    const PxPrime = Px + OFFSET;
    const PyPrime = Py + OFFSET;

    const det = Ax * By - Ay * Bx;
    if (det === 0) {
      // No unique solution
      continue;
    }

    // Solve for a and b
    const aNum = PxPrime * By - PyPrime * Bx;
    const bNum = Ax * PyPrime - Ay * PxPrime;

    // Check divisibility
    if (aNum % det !== 0 || bNum % det !== 0) {
      // Not integral solutions
      continue;
    }

    const a = aNum / det;
    const b = bNum / det;

    // Check non-negativity
    if (a < 0 || b < 0) {
      continue;
    }

    // Calculate cost
    const cost = 3 * a + b;
    totalCost += cost;
    solvableCount++;
  }

  return totalCost.toString();
}
