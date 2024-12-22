const randomNumber = (seed: bigint) => {
  seed = ((seed << 6n) ^ seed) % 16777216n;
  seed = ((seed >> 5n) ^ seed) % 16777216n;
  seed = ((seed << 11n) ^ seed) % 16777216n;
  return seed;
};

const processNumber = (num: bigint) => {
  let seed = num;
  for (let i = 0; i < 2000; i++) {
    seed = randomNumber(seed);
  }
  return seed;
};

const calculateSum = (input: string) => {
  return input
    .split("\n")
    .map(BigInt)
    .reduce((sum, num) => sum + processNumber(num), 0n);
};

export function part1(input: string): string {
  return calculateSum(input).toString();
}
