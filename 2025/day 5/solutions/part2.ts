export function part2(input: string): string {
  let [RawRanges] = input.split("\n\n")

  const ranges = RawRanges.split("\n").map(line => { 
    const [min, max] = line.split("-").map(Number); 
    return { min, max };
  });

  
  //merge overlapping ranges
  ranges.sort((a, b) => a.min - b.min);
  const mergedRanges = [];
  let currentRange = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const range = ranges[i];
    if (range.min <= currentRange.max + 1) {
      currentRange.max = Math.max(currentRange.max, range.max);
    } else {
      mergedRanges.push(currentRange);
      currentRange = range;
    }
  }
  mergedRanges.push(currentRange);


  let validIdsCount = 0;
  for (const range of mergedRanges) {
    validIdsCount += (range.max - range.min + 1);
  }

  return validIdsCount.toString();
}
