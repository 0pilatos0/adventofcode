export function part2(input: string): string {
  let numbers = input.split("").map(Number);

  for (let i = 0; i < 50; i++) {
    const results = [];

    let groupedNumbers: number[][] = [];
    let currentGroup: number[] = [];

    for (const number of numbers) {
      if (currentGroup.length === 0 || currentGroup[0] === number) {
        currentGroup.push(number);
      } else {
        groupedNumbers.push(currentGroup);
        currentGroup = [number];
      }
    }

    groupedNumbers.push(currentGroup);

    for (const group of groupedNumbers) {
      results.push(group.length);
      results.push(group[0]);
    }

    numbers = results;
  }

  return numbers.length.toString();
}
