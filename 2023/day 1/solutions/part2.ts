const digetMap = [
  { number: 1, letters: "one" },
  { number: 2, letters: "two" },
  { number: 3, letters: "three" },
  { number: 4, letters: "four" },
  { number: 5, letters: "five" },
  { number: 6, letters: "six" },
  { number: 7, letters: "seven" },
  { number: 8, letters: "eight" },
  { number: 9, letters: "nine" },
];

export function part2(input: string): string {
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

      const textNumber = checkIfNumberStartsOnPosition(lines[i], j);
      if (textNumber !== null) {
        firstNumber = textNumber;
        break;
      }
    }

    for (let j = lines[i].length - 1; j >= 0; j--) {
      if (!isNaN(parseInt(lines[i][j]))) {
        lastNumber = lines[i][j];
        break;
      }

      const textNumber = checkIfNumberEndsOnPosition(lines[i], j);
      if (textNumber !== null) {
        lastNumber = textNumber;
        break;
      }
    }

    if (firstNumber === undefined || lastNumber === undefined) {
      console.log("Something went wrong");
      return "0";
    }

    values.push(parseInt(firstNumber + "" + lastNumber + ""));
  }

  return values.reduce((a, b) => a + b, 0) + "";
}

function checkIfNumberStartsOnPosition(
  line: string[],
  position: number
): number | null {
  for (const digit of digetMap) {
    if (line[position] === digit.letters[0]) {
      let match = true;
      for (let i = 1; i < digit.letters.length; i++) {
        if (line[position + i] !== digit.letters[i]) {
          match = false;
          break;
        }
      }
      if (match) {
        return digit.number;
      }
    }
  }

  return null;
}

function checkIfNumberEndsOnPosition(
  line: string[],
  position: number
): number | null {
  for (const digit of digetMap) {
    if (line[position] === digit.letters[digit.letters.length - 1]) {
      let match = true;
      for (let i = 1; i < digit.letters.length; i++) {
        if (
          line[position - i] !== digit.letters[digit.letters.length - 1 - i]
        ) {
          match = false;
          break;
        }
      }
      if (match) {
        return digit.number;
      }
    }
  }

  return null;
}
