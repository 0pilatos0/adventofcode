export function part1(input: string): string {
type Assignment = {
  numbers: number[];
  operator: "*" | "+";
}

 const lines = input.split("\n").map(line => {
    const parts = line.trim().split(" ").map((part) => part.trim()).filter(part => part.length > 0);
    return parts;
 });

 const assignments: Assignment[] = [];

  for (let i = 0; i < lines[0].length; i++) {
      const numbers: number[] = [];
      for (let j = 0; j < lines.length - 1; j++) {
          numbers.push(parseInt(lines[j][i], 10));
      }
      const operator = lines[lines.length - 1][i] as "*" | "+";
      assignments.push({ numbers, operator });
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
