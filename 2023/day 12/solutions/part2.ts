type Line = {
  records: string[];
  groupSizes: number[];
  possibleVariations: number;
};

type SpecialLines = {
  originalLine: Line;
  possibleLines: Line[];
};

export function part2(input: string): string {
  const lines = input
    .split("\n")
    .map((line) => line.split(" "))
    .map((line) => {
      const records = line[0].split("");
      const groupSizes = line[1].split(",").map((size) => parseInt(size));
      return { records, groupSizes, possibleVariations: 0 };
    }) as Line[];

  const multipliedLines = lines.map((line) => {
    //unfold
    return unFoldLine(line);
  });

  console.log(multipliedLines);

  const specialLines = multipliedLines.map((line) => {
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

    console.log(specialLine.originalLine.possibleVariations);
    // console.log(specialLine);
  });

  const possibleVariations = specialLines.map(
    (specialLine) => specialLine.originalLine.possibleVariations
  );

  //return sum of possible variations
  return possibleVariations.reduce((acc, cur) => acc + cur).toString();
}

function generatePossibleLines(line: Line): Line[] {
  const possibleLines: Line[] = [];

  const queue: { records: string[]; index: number }[] = [
    { records: line.records, index: 0 },
  ];

  while (queue.length > 0) {
    const { records, index } = queue.pop()!;

    if (index === records.length) {
      const groupSizes = line.groupSizes;
      possibleLines.push({ records, groupSizes, possibleVariations: 0 });
      continue;
    }

    if (records[index] === "?") {
      queue.push({
        records: [...records.slice(0, index), "#", ...records.slice(index + 1)],
        index: index + 1,
      });
      queue.push({
        records: [...records.slice(0, index), ".", ...records.slice(index + 1)],
        index: index + 1,
      });
    } else {
      queue.push({ records, index: index + 1 });
    }
  }

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

function unFoldLine(line: Line): Line {
  let newLineString = line.records.join("");
  let newGroupSizes = line.groupSizes.join(",");

  //add 4 copies of the line to the string
  for (let i = 0; i < 4; i++) {
    newLineString += "?" + line.records.join("");
  }

  //add 4 copies of the group sizes to the string
  for (let i = 0; i < 4; i++) {
    newGroupSizes += "," + line.groupSizes.join(",");
  }

  line.records = newLineString.split("");
  line.groupSizes = newGroupSizes.split(",").map((size) => parseInt(size));

  return line;
}
