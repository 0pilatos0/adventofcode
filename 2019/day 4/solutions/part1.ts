export function part1(input: string): string {
  const [start, end] = input.split("-").map(Number);
  let count = 0;

  for (let i = start; i <= end; i++) {
    const str = i.toString();
    let hasDouble = false;
    let isIncreasing = true;

    for (let j = 0; j < str.length - 1; j++) {
      if (str[j] === str[j + 1]) {
        hasDouble = true;
      }

      if (str[j] > str[j + 1]) {
        isIncreasing = false;
        break;
      }
    }

    if (hasDouble && isIncreasing) {
      count++;
    }
  }

  return count.toString();
}
