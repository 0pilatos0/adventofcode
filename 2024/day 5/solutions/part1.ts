export function part1(input: string): string {
  const [rules, pages] = input.split("\r\n\r\n");

  const rulesList = rules.split("\r\n").map((rule) => {
    return rule.split("|");
  });

  const updates = pages.split("\r\n").map((page) => {
    return page.split(",");
  });

  let validUpdates = [];

  for (const update of updates) {
    let valid = true;

    for (let index = 0; index < update.length; index++) {
      const page = update[index];

      const rules = rulesList.filter((rule) => {
        return rule[0].includes(page);
      });

      for (const rule of rules) {
        const targetIndex = update.indexOf(rule[1]);

        if (targetIndex === -1) {
          continue;
        }

        if (targetIndex < index) {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      validUpdates.push(update);
    }
  }

  const middleNumbers = validUpdates
    .map((update) => {
      const middleIndex = Math.floor(update.length / 2);
      return update[middleIndex];
    })
    .map(Number);

  return middleNumbers.reduce((sum, number) => sum + number, 0).toString();
}
