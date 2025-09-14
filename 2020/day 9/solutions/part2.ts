export function part2(input: string): string {
  const numbers = input
    .trim()
    .split("\n")
    .map((line) => parseInt(line, 10));

  const preambleLength = numbers.length <= 20 ? 5 : 25;

  function canFormSum(target: number, previousNumbers: number[]): boolean {
    const numSet = new Set(previousNumbers);

    for (const num of previousNumbers) {
      const complement = target - num;
      if (complement !== num && numSet.has(complement)) {
        return true;
      }
    }
    return false;
  }

  let invalidNumber = 0;
  for (let i = preambleLength; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const previousNumbers = numbers.slice(i - preambleLength, i);

    if (!canFormSum(currentNumber, previousNumbers)) {
      invalidNumber = currentNumber;
      break;
    }
  }

  if (invalidNumber === 0) {
    return "No invalid number found";
  }

  for (let start = 0; start < numbers.length - 1; start++) {
    let currentSum = numbers[start];

    for (let end = start + 1; end < numbers.length; end++) {
      currentSum += numbers[end];

      if (currentSum === invalidNumber) {
        const sequence = numbers.slice(start, end + 1);

        const min = Math.min(...sequence);
        const max = Math.max(...sequence);

        return (min + max).toString();
      }

      if (currentSum > invalidNumber) {
        break;
      }
    }
  }

  return "No contiguous sequence found";
}
