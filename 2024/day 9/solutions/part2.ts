export function part2(input: string): string {
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
  interface FileInfo {
    id: number;
    start: number;
    length: number;
  }

  const files: FileInfo[] = [];
  const disk: number[] = [];
  {
    let fIndex = 0;
    let isFile = true;
    for (let j = 0; j < chars.length; j++) {
      const count = parseInt(chars[j], 10);
      if (isFile) {
        for (let c = 0; c < count; c++) {
          disk.push(fIndex);
        }
        isFile = false;
        fIndex++;
      } else {
        for (let c = 0; c < count; c++) {
          disk.push(-1);
        }
        isFile = true;
      }
    }
  }

  const maxFileID = Math.max(...disk.filter((d) => d >= 0));
  const fileStarts = new Map<number, { start: number; length: number }>();
  {
    let curFile = -1;
    let startPos = -1;
    let length = 0;
    for (let i = 0; i < disk.length; i++) {
      const val = disk[i];
      if (val >= 0) {
        if (val !== curFile) {
          if (curFile !== -1) {
            fileStarts.set(curFile, { start: startPos, length: length });
          }
          curFile = val;
          startPos = i;
          length = 1;
        } else {
          length++;
        }
      }
    }
    if (curFile !== -1) {
      fileStarts.set(curFile, { start: startPos, length: length });
    }
  }
  function getFreeSegments(dsk: number[]): { start: number; length: number }[] {
    const segments: { start: number; length: number }[] = [];
    let segStart = -1;
    for (let i = 0; i < dsk.length; i++) {
      if (dsk[i] === -1) {
        if (segStart === -1) segStart = i;
      } else {
        if (segStart !== -1) {
          segments.push({ start: segStart, length: i - segStart });
          segStart = -1;
        }
      }
    }
    if (segStart !== -1) {
      segments.push({ start: segStart, length: dsk.length - segStart });
    }
    return segments;
  }

  for (let fid = maxFileID; fid >= 0; fid--) {
    const fileInfo = fileStarts.get(fid);
    if (!fileInfo) continue;

    const freeSegs = getFreeSegments(disk);
    let candidate = null;
    for (const seg of freeSegs) {
      if (seg.start + seg.length <= fileInfo.start && seg.length >= fileInfo.length) {
        // Suitable
        if (candidate === null || seg.start < candidate.start) {
          candidate = seg;
        }
      }
    }

    if (candidate) {
      for (let i = fileInfo.start; i < fileInfo.start + fileInfo.length; i++) {
        disk[i] = -1;
      }
      for (let i = 0; i < fileInfo.length; i++) {
        disk[candidate.start + i] = fid;
      }
      fileStarts.set(fid, { start: candidate.start, length: fileInfo.length });
    }
  }

  let checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    const val = disk[i];
    if (val >= 0) {
      checksum += i * val;
    }
  }

  return checksum.toString();
}
