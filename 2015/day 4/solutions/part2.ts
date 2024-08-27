export function part2(input: string): string {
  let counter = 0;
  let hash = "";

  while (!startsWith6Zeros(hash)) {
    counter++;
    hash = input + counter;
  }
  return counter.toString();
}

function startsWith6Zeros(hash: string): boolean {
  const cryptoHasher = new Bun.CryptoHasher("md5");
  cryptoHasher.update(hash);
  const calculatedHash = cryptoHasher.digest("hex");

  return calculatedHash.startsWith("000000");
}
