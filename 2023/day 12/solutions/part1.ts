type Line = {
  records: string[];
  groupSizes: number[];
  possibleVariations: number;
};

type SpecialLines = {
  originalLine: Line;
  possibleLines: Line[];
};

export function part1(input: string): string {
  const lines = input
    .split("\n")
    .map((line) => line.split(" "))
    .map((line) => {
      const records = line[0].split("");
      const groupSizes = line[1].split(",").map((size) => parseInt(size));
      return { records, groupSizes, possibleVariations: 0 };
    }) as Line[];

  const specialLines = lines.map((line) => {
    const possibleLines = generatePossibleLines(line);
    return { originalLine: line, possibleLines };
  }) as SpecialLines[];

  specialLines.forEach((specialLine) => {
    specialLine.possibleLines.forEach((possibleLine) => {
      if (linePossible(possibleLine)) {
        specialLine.originalLine.possibleVariations++;
        possibleLine.possibleVariations++;

        // console.log(possibleLine.records.join(""));
      }
    });

    // console.log(specialLine.originalLine.possibleVariations);
    // console.log(specialLine);
  });

  const possibleVariations = specialLines.map(
    (specialLine) => specialLine.originalLine.possibleVariations
  );

  //return sum of possible variations
  return possibleVariations.reduce((acc, cur) => acc + cur).toString();
}

function generatePossibleLines(line: Line): Line[] {
  //generate all possible lines while replacing ? with # or . replacing all ? with eather the # or .
  //???.### 1,1,3

  // will trun into
  // ###.### 1,1,3
  // #.#.### 1,1,3
  // ##..### 1,1,3
  // ....### 1,1,3
  // .##7916.### 1,1,3
  // #...### 1,1,3

  //generate all possible combinations of # and .
  const possibleCombinations = cartesianProduct(
    ...line.records.map((record) => {
      if (record === "?") {
        return ["#", "."];
      } else {
        return [record];
      }
    })
  );

  //generate all variations of the line
  const possibleLines = possibleCombinations.map((combination) => {
    const records = combination as string[];
    const groupSizes = line.groupSizes;
    return { records, groupSizes, possibleVariations: 0 };
  }) as Line[];

  // console.log(possibleLines);
  return possibleLines;
}

function linePossible(line: Line): boolean {
  let records = line.records;
  let groups = line.groupSizes;
  let currentGroupIndex = 0;
  let currentRecordIndex = 0;

  const groupsOfHashtags = records.join("").split(".");
  const groupsOfHashtagsWithoutEmpty = groupsOfHashtags.filter(
    (group) => group !== ""
  );

  if (groupsOfHashtagsWithoutEmpty.length !== groups.length) {
    return false;
  }

  while (currentGroupIndex < groups.length) {
    const currentGroupSize = groups[currentGroupIndex];

    if (currentRecordIndex >= records.length) {
      return false; // Ran out of records before completing all groups
    }

    const currentRecord = records[currentRecordIndex];

    if (currentRecord === "#" || currentRecord === "?") {
      // Check if the current record contributes to the current group
      currentRecordIndex++;
      let count = 1; // Count the current record

      while (
        currentRecordIndex < records.length &&
        records[currentRecordIndex] === "#"
      ) {
        // Count consecutive "#" records
        count++;
        currentRecordIndex++;
      }

      if (count !== currentGroupSize) {
        return false; // The current group size is not satisfied
      }

      currentGroupIndex++;
    } else if (currentRecord === ".") {
      // Move to the next record
      currentRecordIndex++;
    } else {
      return false; // Invalid character found
    }
  }

  return currentGroupIndex === groups.length;
}

function cartesianProduct<T>(...sets: T[][]): T[][] {
  return sets.reduce<T[][]>(
    (acc, set) => acc.flatMap((x) => set.map((y) => [...x, y])),
    [[]]
  );
}
