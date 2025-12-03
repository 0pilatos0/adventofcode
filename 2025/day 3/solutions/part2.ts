export function part2(input: string): string {
  const batteryBanks = input.trim().split('\n').map((bank) => {
    const batteries = bank.split('').map(Number);
    return batteries;
  });

  const TARGET_LENGTH = 12;

  const joltageLevels: number[] = [];

  for (const bank of batteryBanks) {
    const joltageNumbers: number[] = [];

    for (let index = 0; index < bank.length; index++) {
      const battery = bank[index];
      const remainingBatteries = bank.length - (index + 1);
      const neededBatteries = TARGET_LENGTH - joltageNumbers.length - 1;

      const canSkip = remainingBatteries > neededBatteries;
      const skipBudget = remainingBatteries - neededBatteries;

      if (!canSkip) {
        if (joltageNumbers.length < TARGET_LENGTH)
          joltageNumbers.push(battery);

        continue;
      }

      let highestInLookahead = battery;
      let highestIndex = index;

      for (let lookahead = 1; lookahead <= skipBudget; lookahead++) {
        const lookaheadBattery = bank[index + lookahead];
        if (lookaheadBattery > highestInLookahead) {
          highestInLookahead = lookaheadBattery;
          highestIndex = index + lookahead;
        }
      }


      if (joltageNumbers.length < TARGET_LENGTH) {
        joltageNumbers.push(highestInLookahead);
      }
      index = highestIndex;
    }

    joltageLevels.push(parseInt(joltageNumbers.join(''), 10));
  }

  const totalJoltage = joltageLevels.reduce((acc, curr) => acc + curr, 0);
  return totalJoltage.toString();


}
