export function part1(input: string): string {
  const [rules, pages] = input.split("\n\n");

  const rulesList = rules.split("\n").map((rule) => rule.split("|"));
  const updates = pages.split("\n").map((page) => page.split(","));

  const validUpdates = updates.filter((update) => {
    return update.every((page, index) => {
      return rulesList.every(([rulePage, ruleTarget]) => {
        if (!rulePage.includes(page)) return true;
        const targetIndex = update.indexOf(ruleTarget);
        return targetIndex === -1 || targetIndex >= index;
      });
    });
  });

  const middleNumbers = validUpdates.map((update) => update[Math.floor(update.length / 2)]).map(Number);

  return middleNumbers.reduce((sum, number) => sum + number, 0).toString();
}
