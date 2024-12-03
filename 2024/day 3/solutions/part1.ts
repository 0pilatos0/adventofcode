export function part1(input: string): string {
  const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/gm;
  const instructions = input.match(regex);
  let count = 0;

  instructions?.forEach((instruction) => {
    const [left, right] = instruction.slice(4, -1).split(",").map(Number);
    count += left * right;
  });

  return count.toString();
}
