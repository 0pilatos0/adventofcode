export function part2(input: string): string {

  type Assignment = {
    numbers: number[];
    operator: "*" | "+";
  }

  const lines = input.split("\n").map(line => {
    const parts = line.split("");
    return parts;
  });

  const assignments: Assignment[] = [];

  let currentOperator = null;
  let verticalNumbers: number[][] = [];

  for (let i = 0; i < lines[0].length; i++) {
    const rawVerticalNumbers: number[] = [];
    for (let j = 0; j < lines.length - 1; j++) {
      rawVerticalNumbers.push(parseInt(lines[j][i], 10));
    }
    if (lines[lines.length - 1][i] === "*" || lines[lines.length - 1][i] === "+") {
      currentOperator = lines[lines.length - 1][i] as "*" | "+";
    }
    verticalNumbers.push(rawVerticalNumbers);

    if (rawVerticalNumbers.every(num => isNaN(num)) || i === lines[0].length - 1) {

      const calculatedNumbers: number[] = [];
      for (const nums of verticalNumbers) {
        const filteredNums = nums.filter(num => !isNaN(num));
        if (filteredNums.length === 0) {
          continue;
        }
        calculatedNumbers.push(parseInt(filteredNums.join(""), 10));
      }
      
      assignments.push({ numbers: calculatedNumbers, operator: currentOperator! });
      verticalNumbers = [];
      currentOperator = null;
    }
  }

  let summery = 0;
  for (const assignment of assignments) {
    if (assignment.operator === "*") {
      let product = 1;
      for (const num of assignment.numbers) {
        product *= num;
      }
      summery += product;
    } else {
      let sum = 0;
      for (const num of assignment.numbers) {
        sum += num;
      }
      summery += sum;
    }
  }

  return summery.toString();
}
