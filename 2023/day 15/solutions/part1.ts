export function part1(input: string): string {
  const strings = input.replace(/\n+/, "").split(",");
  return strings.reduce((acc, s) => acc + hash(s), 0).toString();
}

function hash(input: string): number {
  let curr = 0;
  for (let i = 0; i < input.length; i++) {
    const code = input[i].charCodeAt(0);
    curr += code;
    curr *= 17;
    curr %= 256;
  }
  return curr;
}
