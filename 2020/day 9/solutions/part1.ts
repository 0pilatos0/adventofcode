export function part1(input: string): string {
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

  for (let i = preambleLength; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const previousNumbers = numbers.slice(i - preambleLength, i);

    if (!canFormSum(currentNumber, previousNumbers)) {
      return currentNumber.toString();
    }
  }

  return "No invalid number found";
}
