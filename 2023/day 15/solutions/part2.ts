export function part2(input: string): string {
  const boxes = Array.from({ length: 256 }, () => new Map<string, number>());
  const strings = input.replace(/\n+/, "").split(",");

  for (let string of strings) {
    const [label, op, n] = string.split(/\b/);
    const index = hash(label);
    if (op === "=") {
      boxes[index].set(label, Number(n));
    } else {
      boxes[index].delete(label);
    }
  }

  let total = 0;
  for (let i = 0; i < boxes.length; i++) {
    let slot = 1;
    for (const focalLength of boxes[i].values()) {
      total += (i + 1) * slot++ * focalLength;
    }
  }

  return total.toString();
}

function hash(input: string): number {
  let curr = 0;
  for (let i = 0; i < input.length; i++) {
    const code = input[i].charCodeAt(0);
    curr += code;
    curr *= 17;
    curr %= 256;
  }
  return curr;
}
