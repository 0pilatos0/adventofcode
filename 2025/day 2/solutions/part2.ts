export function part2(input: string): string {
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

    const patternLength = Math.floor(len / 2);

    for (let i = 1; i <= patternLength; i++) {
      if (len % i === 0) {
        const pattern = codeStr.slice(0, i);
        const repeatedPattern = pattern.repeat(len / i);
        if (repeatedPattern === codeStr && (len / i) >= 2) {
          return true;
        }
      }
    }
    
    return false;
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
