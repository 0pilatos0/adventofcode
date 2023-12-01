export function part1(input: string): string {
  const lines = input.split("\n").map((line) => line.split(""));
  let values = [];

  for (let i = 0; i < lines.length; i++) {
    let firstNumber;
    let lastNumber;

    for (let j = 0; j < lines[i].length; j++) {
      if (!isNaN(parseInt(lines[i][j]))) {
        firstNumber = lines[i][j];
        break;
      }
    }

    for (let j = lines[i].length - 1; j >= 0; j--) {
      if (!isNaN(parseInt(lines[i][j]))) {
        lastNumber = lines[i][j];
        break;
      }
    }

    if (firstNumber === undefined || lastNumber === undefined) {
      console.log("Something went wrong");
      return "0";
    }

    values.push(parseInt(firstNumber + lastNumber + ""));
  }

  return values.reduce((a, b) => a + b, 0) + "";
}
