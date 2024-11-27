export function part1(input: string): string {
  let codeChars = 0;
  let memoryChars = 0;

  const lines = input.split("\r\n");

  for (const line of lines) {
    codeChars += line.length;
    memoryChars += eval(line).length;
  }

  return (codeChars - memoryChars).toString();
}
