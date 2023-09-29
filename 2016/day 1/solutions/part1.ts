// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part1(input: string): string {
  type Direction = "N" | "E" | "S" | "W";

  let x = 0;
  let y = 0;
  let direction: Direction = "N";

  const instructions = input.toString().split(", ");

  for (const instruction of instructions) {
    if (instruction[0] === "R") {
      if (direction === "N") direction = "E";
      else if (direction === "E") direction = "S";
      else if (direction === "S") direction = "W";
      else if (direction === "W") direction = "N";
    }

    if (instruction[0] === "L") {
      if (direction === "N") direction = "W";
      else if (direction === "W") direction = "S";
      else if (direction === "S") direction = "E";
      else if (direction === "E") direction = "N";
    }

    const distance = parseInt(instruction.slice(1), 10);

    if (direction === "N") y += distance;
    if (direction === "S") y -= distance;
    if (direction === "E") x += distance;
    if (direction === "W") x -= distance;
  }

  let xDiff = 0;
  let yDiff = 0;

  if (x < 0) xDiff = x * -1;
  else xDiff = x;

  if (y < 0) yDiff = y * -1;
  else yDiff = y;

  const distance = xDiff + yDiff;

  return distance.toString();
}
