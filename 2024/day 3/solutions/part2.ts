export function part2(input: string): string {
  const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)|don't\(\)|do\(\)/gm;
  const matches = input.match(regex);
  let count = 0;
  let enabled = true;

  for (const match of matches!) {
    switch (match) {
      case "don't()":
        enabled = false;
        continue;
      case "do()":
        enabled = true;
        continue;
    }

    if (!enabled) {
      continue;
    }

    const [left, right] = match
      .slice(4, -1)
      .split(",")
      .map((n) => parseInt(n, 10));

    count += left * right;
  }

  return count.toString();
}
