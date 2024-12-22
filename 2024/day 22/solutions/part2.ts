const randomNumber = (seed: bigint) => {
  seed = ((seed << 6n) ^ seed) % 16777216n;
  seed = ((seed >> 5n) ^ seed) % 16777216n;
  seed = ((seed << 11n) ^ seed) % 16777216n;
  return seed;
};

const processNumber = (num: bigint, ranges: { [key: string]: number[] }) => {
  let seed = num;
  const visited = new Set<string>();
  const changes: number[] = [];
  for (let i = 0; i < 2000; i++) {
    const nextSeed = randomNumber(seed);
    changes.push(Number((nextSeed % 10n) - (seed % 10n)));
    seed = nextSeed;

    if (changes.length === 4) {
      const key = changes.join(",");
      if (!visited.has(key)) {
        if (!ranges[key]) ranges[key] = [];
        ranges[key].push(Number(nextSeed % 10n));
        visited.add(key);
      }
      changes.shift();
    }
  }
};

const calculateRanges = (input: string) => {
  const ranges: { [key: string]: number[] } = {};
  input
    .split("\n")
    .map(BigInt)
    .forEach((num) => processNumber(num, ranges));
  return ranges;
};

const calculateMaxSum = (ranges: { [key: string]: number[] }) => {
  return Math.max(...Object.values(ranges).map((range) => range.reduce((sum, num) => sum + num, 0)));
};

export function part2(input: string): string {
  const ranges = calculateRanges(input);
  const maxSum = calculateMaxSum(ranges);
  return maxSum.toString();
}
