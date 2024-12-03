export function part2(input: string): string {
  const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)|don't\(\)|do\(\)/gm;
  const instructions = input.match(regex);
  let count = 0;
  let enabled = true;

  instructions?.forEach((instruction) => {
    if (instruction === "don't()") {
      enabled = false;
    } else if (instruction === "do()") {
      enabled = true;
    } else if (enabled) {
      const [left, right] = instruction.slice(4, -1).split(",").map(Number);
      count += left * right;
    }
  });

  return count.toString();
}
