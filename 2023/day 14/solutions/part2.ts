export function part2(input: string): string {
  const lines = input.split("\n").map((line) => line.split(""));

  function TiltNorth() {
    for (let j = 0; j < lines[0].length; j++) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i][j] != "O") {
          continue;
        }

        let position = i - 1;
        while (position >= 0 && lines[position][j] == ".") {
          position--;
        }

        if (position < i - 1) {
          lines[position + 1][j] = "O";
          lines[i][j] = ".";
        }
      }
    }
  }

  function TiltSouth() {
    for (let j = 0; j < lines[0].length; j++) {
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i][j] != "O") {
          continue;
        }

        let position = i + 1;
        while (position < lines.length && lines[position][j] == ".") {
          position++;
        }

        if (position > i + 1) {
          lines[position - 1][j] = "O";
          lines[i][j] = ".";
        }
      }
    }
  }

  function TiltWest() {
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] != "O") {
          continue;
        }

        let position = j - 1;
        while (position >= 0 && lines[i][position] == ".") {
          position--;
        }

        if (position < j - 1) {
          lines[i][position + 1] = "O";
          lines[i][j] = ".";
        }
      }
    }
  }

  function TiltEast() {
    for (let i = 0; i < lines.length; i++) {
      for (let j = lines[0].length - 1; j >= 0; j--) {
        if (lines[i][j] != "O") {
          continue;
        }

        let position = j + 1;
        while (position < lines[0].length && lines[i][position] == ".") {
          position++;
        }

        if (position > j + 1) {
          lines[i][position - 1] = "O";
          lines[i][j] = ".";
        }
      }
    }
  }

  const seenArrangements: { [key: string]: number } = {};
  function valueExistsInObject(value: string): boolean {
    return Object.keys(seenArrangements).includes(value);
  }

  function Cycle() {
    TiltNorth();
    TiltWest();
    TiltSouth();
    TiltEast();
  }

  let state = lines
    .map((subArray) => subArray.join(" ")) // Join each sub-array into a string
    .join(" "); // Join the resulting strings into a single string

  let index = 0;
  let totalCycles = 1000000000;
  while (!valueExistsInObject(state) && index < totalCycles) {
    seenArrangements[state] = index;
    index++;
    Cycle();
    state = lines
      .map((subArray) => subArray.join(" ")) // Join each sub-array into a string
      .join(" "); // Join the resulting strings into a single string
  }

  let cycleStart = seenArrangements[state];
  let cycleEnd = index;
  let remainingCycles = (totalCycles - cycleStart) % (cycleEnd - cycleStart);

  console.log("cycle found: " + cycleStart + ":" + cycleEnd);
  console.log("remaining cycles: " + remainingCycles);

  for (let i = 0; i < remainingCycles; i++) {
    Cycle();
  }

  let sum = 0;

  for (let j = 0; j < lines[0].length; j++) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i][j] != "O") {
        continue;
      }

      sum += lines.length - i;
    }
  }

  return sum.toString();
}
