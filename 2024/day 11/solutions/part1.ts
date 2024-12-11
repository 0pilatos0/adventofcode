export function part1(input: string): string {
  const stones = input.split(/\s+/).filter((x) => x.length > 0);
  const MULTIPLIER = BigInt(2024);

  const memo = new Map<string, number>();

  function splitStone(stone: string): [string, string] {
    const len = stone.length;
    const half = len / 2;
    const leftPart = stone.slice(0, half);
    const rightPart = stone.slice(half);
    const leftNum = parseInt(leftPart, 10).toString();
    const rightNum = parseInt(rightPart, 10).toString();
    return [leftNum, rightNum];
  }

  function multiplyStone(stone: string): string {
    const num = BigInt(stone);
    const result = num * MULTIPLIER;
    return result.toString();
  }

  function countStonesAfterN(stone: string, N: number): number {
    if (N === 0) {
      return 1;
    }

    const key = stone + "#" + N;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    let resultCount = 0;
    if (stone === "0") {
      // 0 -> 1 stone "1" next step
      resultCount = countStonesAfterN("1", N - 1);
    } else if (stone.length % 2 === 0) {
      // even length: split into two stones
      const [left, right] = splitStone(stone);
      resultCount = countStonesAfterN(left, N - 1) + countStonesAfterN(right, N - 1);
    } else {
      // odd length (not zero): multiply by 2024
      const newStone = multiplyStone(stone);
      resultCount = countStonesAfterN(newStone, N - 1);
    }

    memo.set(key, resultCount);
    return resultCount;
  }

  // Sum results for all initial stones after 25 blinks
  let total = 0;
  for (const s of stones) {
    total += countStonesAfterN(s, 25);
  }

  return total.toString();
}
