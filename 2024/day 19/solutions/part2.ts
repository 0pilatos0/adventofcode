export function part2(input: string): string {
  const data: string[] = input.split("\r\n\r\n");

  const towels: string[] = data[0].split(", ");
  const patterns: string[] = data[1].split("\r\n");
  let answerp2: number = 0;

  function memoize(partialPattern: string, towels: string[], memo: Map<string, number>): number {
    if (memo.has(partialPattern)) return memo.get(partialPattern) as number;
    if (!partialPattern.length) return 1;
    const count: number = towels
      .filter((towel: string) => partialPattern.startsWith(towel))
      .reduce((sum: number, towel: string) => sum + memoize(partialPattern.slice(towel.length), towels, memo), 0);
    memo.set(partialPattern, count);
    return count;
  }

  patterns.forEach((pattern: string) => {
    const totalCount: number = memoize(pattern, towels, new Map<string, number>());
    answerp2 += totalCount;
  });

  return answerp2.toString();
}
