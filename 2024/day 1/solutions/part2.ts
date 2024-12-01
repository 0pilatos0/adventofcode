export function part2(input: string): string {
  const lines = input.split("\n");

  const leftGroup: number[] = [];
  const rightGroup: number[] = [];

  for (const line of lines) {
    const [left, right] = line.split("  ");
    leftGroup.push(parseInt(left));
    rightGroup.push(parseInt(right));
  }

  let appearances = 0;
  for (let i = 0; i < leftGroup.length; i++) {
    const left = leftGroup[i];
    let found = 0;

    for (let j = 0; j < rightGroup.length; j++) {
      const right = rightGroup[j];

      if (left === right) {
        found++;
      }
    }

    appearances += left * found;
  }

  return appearances.toString();
}
