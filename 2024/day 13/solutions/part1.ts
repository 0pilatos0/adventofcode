export function part1(input: string): string {
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
  let count = 0;

  for (const m of machines) {
    const { Ax, Ay, Bx, By, Px, Py } = m;
    let minCost = Infinity;
    for (let a = 0; a <= 100; a++) {
      for (let b = 0; b <= 100; b++) {
        const xPos = a * Ax + b * Bx;
        const yPos = a * Ay + b * By;
        if (xPos === Px && yPos === Py) {
          const cost = a * 3 + b * 1;
          if (cost < minCost) {
            minCost = cost;
          }
        }
      }
    }
    if (minCost !== Infinity) {
      totalCost += minCost;
      count++;
    }
  }

  return totalCost.toString();
}
