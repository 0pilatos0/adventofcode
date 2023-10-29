export function part1(input: string): string {
  const lines = input.split("\n");

  type Line = {
    string: string;
    sectorId: number;
    checksum: string;
  };

  const parsedLines: Line[] = lines.map((line) => {
    const [string, sectorId, checksum] = line
      .match(/([a-z-]+)-(\d+)\[(\w+)\]/)!
      .slice(1);
    return {
      string,
      sectorId: parseInt(sectorId),
      checksum,
    };
  });

  const validLines = parsedLines.filter((line) => {
    const letters = line.string.replace(/-/g, "").split("");
    const letterCount: Record<string, number> = {};
    letters.forEach((letter) => {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    });
    const letterCounts = Object.entries(letterCount).sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0].localeCompare(b[0]);
      }
      return b[1] - a[1];
    });
    const checksum = letterCounts
      .slice(0, 5)
      .map((entry) => entry[0])
      .join("");
    return checksum === line.checksum;
  });

  const sectorIds = validLines.map((line) => line.sectorId);
  return sectorIds.reduce((a, b) => a + b, 0).toString();
}
