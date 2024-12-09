export function part1(input: string): string {
  const chars = input.split("");

  let fileIndex = 0;
  let indexingFile = true;
  let resultString = "";

  for (let j = 0; j < chars.length; j++) {
    const numberToRepeat = parseInt(chars[j], 10);
    if (indexingFile) {
      for (let k = 0; k < numberToRepeat; k++) {
        resultString += fileIndex.toString();
      }
      indexingFile = false;
      fileIndex++;
    } else {
      for (let k = 0; k < numberToRepeat; k++) {
        resultString += ".";
      }
      indexingFile = true;
    }
  }

  while (true) {
    const firstDot = resultString.indexOf(".");
    if (firstDot === -1) {
      break;
    }

    let lastBlockIndex = -1;
    for (let i = resultString.length - 1; i >= 0; i--) {
      if (resultString[i] !== ".") {
        lastBlockIndex = i;
        break;
      }
    }

    if (lastBlockIndex === -1) {
      break;
    }

    const blockChar = resultString[lastBlockIndex];
    resultString = resultString.slice(0, lastBlockIndex) + resultString.slice(lastBlockIndex + 1);
    resultString = resultString.slice(0, firstDot) + blockChar + resultString.slice(firstDot + 1);
  }

  let checksum = 0;
  for (let i = 0; i < resultString.length; i++) {
    const ch = resultString[i];
    if (ch !== ".") {
      const fileID = parseInt(ch, 10);
      checksum += i * fileID;
    }
  }

  return checksum.toString();
}
