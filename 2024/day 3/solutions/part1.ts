export function part1(input: string): string {
  const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/gm;
  const matches = input.match(regex);
  let count = 0;

  for (const match of matches!) {
    const [left, right] = match
      .slice(4, -1)
      .split(",")
      .map((n) => parseInt(n, 10));

    console.log(left, right, match);
    count += left * right;
  }

  return count.toString();
}
