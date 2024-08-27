export function part1(input: string): string {
  let counter = 0;
  let hash = "";

  while (!startsWith5Zeros(hash)) {
    counter++;
    hash = input + counter;
  }
  return counter.toString();
}

function startsWith5Zeros(hash: string): boolean {
  const cryptoHasher = new Bun.CryptoHasher("md5");
  cryptoHasher.update(hash);
  const calculatedHash = cryptoHasher.digest("hex");

  return calculatedHash.startsWith("00000");
}
