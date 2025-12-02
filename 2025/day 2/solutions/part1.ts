export function part1(input: string): string {
  const ranges = input.trim().split(',').map((range) => {
    const [start, end] = range.split('-').map(Number);
    return { start, end };
  });

  const computedRanges = ranges.map(({ start, end }) => {
    const numbers: number[] = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  });

  const invalidCodes: number[] = [];

  function isInvalidID(code: number): boolean {
    const codeStr = code.toString();
    const len = codeStr.length;

    if (len % 2 !== 0) {
      return false;
    }

    const halfLen = len / 2;
    const firstHalf = codeStr.slice(0, halfLen);
    const secondHalf = codeStr.slice(halfLen);

    return firstHalf === secondHalf;
  }


  for(const range of computedRanges) {
    for(const number of range) {
      if (isInvalidID(number)) {
        invalidCodes.push(number);
      }
    }
  }

  const sum = invalidCodes.reduce((acc, curr) => acc + curr, 0);
  return sum.toString();
  }
