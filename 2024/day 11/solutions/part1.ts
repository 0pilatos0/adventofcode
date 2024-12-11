export function part1(input: string): string {
  let stones = input.split(/\s+/).filter((x) => x.length > 0);

  function splitStone(stone: string): string[] {
    const len = stone.length;
    const half = len / 2;
    const leftPart = stone.slice(0, half);
    const rightPart = stone.slice(half);
    // Remove leading zeroes by converting to string of number
    const leftNum = parseInt(leftPart, 10).toString();
    const rightNum = parseInt(rightPart, 10).toString();
    return [leftNum, rightNum];
  }

  function multiplyStone(stone: string): string {
    const num = BigInt(stone);
    const result = num * BigInt(2024);
    return result.toString();
  }

  for (let i = 0; i < 25; i++) {
    const newStones: string[] = [];
    for (const stone of stones) {
      if (stone === "0") {
        newStones.push("1");
      } else if (stone.length % 2 === 0) {
        newStones.push(...splitStone(stone));
      } else {
        newStones.push(multiplyStone(stone));
      }
    }
    stones = newStones;
  }

  return stones.length.toString();
}
