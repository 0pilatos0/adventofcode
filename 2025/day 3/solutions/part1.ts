export function part1(input: string): string {
  const batteryBanks = input.trim().split('\n').map((bank) => {
    const batteries = bank.split('').map(Number);
    return batteries;
  });

  const joltageLevels: number[] = [];

  for (const bank of batteryBanks) {
    let hightestNumber = null;
    let secondshighestNumber = null;

    for (const [index, battery] of bank.entries()) {
      if ((hightestNumber === null || battery > hightestNumber) && index !== bank.length - 1) {
        secondshighestNumber = hightestNumber;
        hightestNumber = battery;
        secondshighestNumber = null;
      } else if (secondshighestNumber === null || battery > secondshighestNumber) {
        secondshighestNumber = battery;
      }
    }
    console.log(hightestNumber, secondshighestNumber);
    joltageLevels.push(parseInt(hightestNumber!.toString() + secondshighestNumber!.toString(), 10));
  }

  const totalJoltage = joltageLevels.reduce((acc, curr) => acc + curr, 0);
  return totalJoltage.toString();


}
