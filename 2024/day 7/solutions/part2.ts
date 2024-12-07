export function part2(input: string): string {
  const lines = input.split("\n").map((line) => line.trim());

  const testableOperators = ["*", "+", "||"];
  const correctResultValues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [resultValue, values] = line.split(": ");
    const seperatedValues = values.split(" ");

    const operatorLenth = seperatedValues.length - 1;
    let operatorCombinations = [];

    for (let j = 0; j < Math.pow(testableOperators.length, operatorLenth); j++) {
      let combination = j;
      const operators = [];

      for (let k = 0; k < operatorLenth; k++) {
        operators.push(testableOperators[combination % testableOperators.length]);
        combination = Math.floor(combination / testableOperators.length);
      }

      operatorCombinations.push(operators);
    }

    for (let j = 0; j < operatorCombinations.length; j++) {
      const operators = operatorCombinations[j];
      let result = parseInt(seperatedValues[0]);

      for (let k = 0; k < operators.length; k++) {
        const operator = operators[k];
        const value = parseInt(seperatedValues[k + 1]);

        if (operator === "+") {
          result += value;
        } else if (operator === "*") {
          result *= value;
        } else if (operator === "||") {
          result = parseInt(result.toString() + value.toString());
        }
      }

      if (result === parseInt(resultValue)) {
        correctResultValues.push(result);
        break;
      }
    }
  }

  //sum all the correct results
  return correctResultValues.reduce((acc, val) => acc + val, 0).toString();
}
