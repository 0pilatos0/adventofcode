export function part2(input: string): string {
  let codeChars = 0;
  let memoryChars = 0;

  const lines = input.split("\r\n");

  for (const line of lines) {
    let encodedLine = '"';
    for (const char of line) {
      if (char === '"' || char === "\\") {
        encodedLine += "\\";
      }
      encodedLine += char;
    }

    encodedLine += '"';
    codeChars += line.length;
    memoryChars += encodedLine.length;
  }

  return (memoryChars - codeChars).toString();
}
