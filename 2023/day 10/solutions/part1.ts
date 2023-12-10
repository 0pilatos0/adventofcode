type PipeEntry = {
  x: number;
  y: number;
  value: "|" | "-" | "L" | "J" | "7" | "F" | "S";
  direction?: "N" | "E" | "S" | "W";
};

export function part1(input: string): string {
  let lines = input.split("\n").map((line) => line.split(""));

  let pipeLines: PipeEntry[] = [];

  let position: PipeEntry = { x: 0, y: 0, value: "S" };
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "S") {
        pipeLines.push({ x, y, value: "S" });
        position = pipeLines[0];
      }
    }
  }

  console.log("Starting position detected at", position);

  pipeLines.push(getFirstPipe(lines, position));
  position = pipeLines[1];

  console.log("First pipe detected at", position);

  //find the next pipe until the we reach S again
  let foundEnd = false;
  while (!foundEnd) {
    pipeLines.push(getNextPipe(lines, pipeLines, position));
    position = pipeLines[pipeLines.length - 1];

    // console.log("Next pipe detected at", position);

    if (position.value === "S") {
      foundEnd = true;
    }
  }

  return ((pipeLines.length - 1) / 2).toString();
}

function getFirstPipe(lines: string[][], position: PipeEntry): PipeEntry {
  //check north
  let north = lines[position.y - 1][position.x];
  if (north === "|" || north === "7" || north === "F") {
    if (north === "F")
      return { x: position.x, y: position.y - 1, value: north, direction: "E" };
    if (north === "7")
      return { x: position.x, y: position.y - 1, value: north, direction: "W" };
    else
      return { x: position.x, y: position.y - 1, value: north, direction: "N" };
  }

  //check east
  let east = lines[position.y][position.x + 1];
  if (east === "-" || east === "J" || east === "7") {
    if (east === "J")
      return { x: position.x + 1, y: position.y, value: east, direction: "N" };
    if (east === "7")
      return { x: position.x + 1, y: position.y, value: east, direction: "S" };
    else
      return { x: position.x + 1, y: position.y, value: east, direction: "E" };
  }

  //check south
  let south = lines[position.y + 1][position.x];
  if (south === "|" || south === "L" || south === "J") {
    if (south === "L")
      return { x: position.x, y: position.y + 1, value: south, direction: "E" };
    if (south === "J")
      return { x: position.x, y: position.y + 1, value: south, direction: "W" };
    else
      return { x: position.x, y: position.y + 1, value: south, direction: "S" };
  }

  //check west
  let west = lines[position.y][position.x - 1];
  if (west === "-" || west === "L" || west === "F") {
    if (west === "L")
      return { x: position.x - 1, y: position.y, value: west, direction: "N" };
    if (west === "F")
      return { x: position.x - 1, y: position.y, value: west, direction: "S" };
    else
      return { x: position.x - 1, y: position.y, value: west, direction: "W" };
  }

  throw new Error("No pipe found");
}

function getNextPipe(
  lines: string[][],
  pipeLines: PipeEntry[],
  position: PipeEntry
): PipeEntry {
  //get the next pipe based on the current position and direction

  let newPipe;
  switch (position.direction) {
    case "N":
      newPipe = lines[position.y - 1][position.x];
      break;
    case "E":
      newPipe = lines[position.y][position.x + 1];
      break;
    case "S":
      newPipe = lines[position.y + 1][position.x];
      break;
    case "W":
      newPipe = lines[position.y][position.x - 1];
      break;
    default:
      throw new Error("Invalid direction");
  }

  switch (newPipe) {
    case "|":
      if (position.direction === "N") {
        return { x: position.x, y: position.y - 1, value: "|", direction: "N" };
      } else if (position.direction === "S") {
        return { x: position.x, y: position.y + 1, value: "|", direction: "S" };
      }
      break;
    case "-":
      if (position.direction === "E") {
        return { x: position.x + 1, y: position.y, value: "-", direction: "E" };
      } else if (position.direction === "W") {
        return { x: position.x - 1, y: position.y, value: "-", direction: "W" };
      }
      break;
    case "L":
      if (position.direction === "S") {
        return { x: position.x, y: position.y + 1, value: "L", direction: "E" };
      } else if (position.direction === "W") {
        return { x: position.x - 1, y: position.y, value: "L", direction: "N" };
      }
      break;
    case "J":
      if (position.direction === "S") {
        return { x: position.x, y: position.y + 1, value: "J", direction: "W" };
      } else if (position.direction === "E") {
        return { x: position.x + 1, y: position.y, value: "J", direction: "N" };
      }
      break;
    case "7":
      if (position.direction === "N") {
        return { x: position.x, y: position.y - 1, value: "7", direction: "W" };
      } else if (position.direction === "E") {
        return { x: position.x + 1, y: position.y, value: "7", direction: "S" };
      }
      break;
    case "F":
      if (position.direction === "N") {
        return { x: position.x, y: position.y - 1, value: "F", direction: "E" };
      } else if (position.direction === "W") {
        return { x: position.x - 1, y: position.y, value: "F", direction: "S" };
      }
      break;
    case "S":
      return { x: position.x, y: position.y, value: "S" };
  }

  throw new Error("No pipe found " + newPipe);
}
