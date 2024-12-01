export function part1(input: string): string {
  const lines = input.split("\n");

  const leftGroup: number[] = [];
  const rightGroup: number[] = [];

  for (const line of lines) {
    const [left, right] = line.split("  ");
    leftGroup.push(parseInt(left));
    rightGroup.push(parseInt(right));
  }

  leftGroup.sort((a, b) => a - b);
  rightGroup.sort((a, b) => a - b);

  let difference = 0;
  for (let i = 0; i < leftGroup.length; i++) {
    const left = leftGroup[i];
    const right = rightGroup[i];
    difference += Math.abs(left - right);
  }

  return difference.toString();
}
