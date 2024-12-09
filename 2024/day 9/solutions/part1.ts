export function part1(input: string): string {
  const chars = input.split("");

  let fileIndex = 0;
  let indexingFile = true;
  let result = [];

  for (const element of chars) {
    const numberToRepeat = parseInt(element, 10);
    if (indexingFile) {
      for (let k = 0; k < numberToRepeat; k++) {
        result.push(fileIndex.toString());
      }
      indexingFile = false;
      fileIndex++;
    } else {
      for (let k = 0; k < numberToRepeat; k++) {
        result.push(".");
      }
      indexingFile = true;
    }
  }

  while (true) {
    const firstDot = result.indexOf(".");
    if (firstDot === -1) {
      break;
    }

    let lastBlockIndex = -1;
    for (let i = result.length - 1; i >= 0; i--) {
      if (result[i] !== ".") {
        lastBlockIndex = i;
        break;
      }
    }

    if (lastBlockIndex === -1) {
      break;
    }

    const blockChar: string = result[lastBlockIndex];

    result = result.slice(0, lastBlockIndex).concat(result.slice(lastBlockIndex + 1));
    result = result
      .slice(0, firstDot)
      .concat(blockChar)
      .concat(result.slice(firstDot + 1));
  }

  let checksum = 0;
  for (let i = 0; i < result.length; i++) {
    const ch = result[i];
    if (ch !== ".") {
      const fileID = parseInt(ch, 10);
      checksum += i * fileID;
    }
  }

  return checksum.toString();
}
