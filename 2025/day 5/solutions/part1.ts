export function part1(input: string): string {
  let [RawRanges, RawIds] = input.split("\n\n")

  const ranges = RawRanges.split("\n").map(line => { 
    const [min, max] = line.split("-").map(Number); 
    return { min, max };
  });

  const ids = RawIds.split("\n").map(Number);

  let validIdsCount = 0;

  for (let id of ids) {
    for (let range of ranges) {
      if (id >= range.min && id <= range.max) {
        validIdsCount++;
        break;
      }
    }
  }

  return validIdsCount.toString();
}
