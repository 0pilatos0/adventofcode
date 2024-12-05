export function part2(input: string): string {
  const [rules, pages] = input.split("\n\n");

  const rulesList = rules.split("\n").map((rule) => rule.split("|"));
  const updates = pages.split("\n").map((page) => page.split(","));

  const invalidUpdates = updates.filter((update) => {
    return update.some((page, index) => {
      return rulesList.some(([rulePage, ruleTarget]) => {
        if (!rulePage.includes(page)) return false;
        const targetIndex = update.indexOf(ruleTarget);
        return targetIndex !== -1 && targetIndex < index;
      });
    });
  });

  const sortedInvalidUpdates = invalidUpdates.map((update) => {
    return update.sort((a, b) => {
      const relevantRules = rulesList.filter(([rulePage]) => rulePage.includes(a));
      const targetIndex = relevantRules.findIndex(([, ruleTarget]) => ruleTarget === b);
      return targetIndex;
    });
  });

  const middleNumbers = sortedInvalidUpdates.map((update) => update[Math.floor(update.length / 2)]).map(Number);

  return middleNumbers.reduce((sum, number) => sum + number, 0).toString();
}
