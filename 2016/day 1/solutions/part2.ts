export function part2(input: string): string {
  type Direction = "N" | "E" | "S" | "W";

  let x = 0;
  let y = 0;
  let direction: Direction = "N";

  let visited: string[] = [];

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

    const start = { x, y };

    if (direction === "N") y += distance;
    if (direction === "S") y -= distance;
    if (direction === "E") x += distance;
    if (direction === "W") x -= distance;

    const end = { x, y };

    if (start.x === end.x) {
      for (let i = start.y; i < end.y; i++) {
        visited.push(`${start.x},${i}`);
      }

      for (let i = start.y; i > end.y; i--) {
        visited.push(`${start.x},${i}`);
      }
    }

    if (start.y === end.y) {
      for (let i = start.x; i < end.x; i++) {
        visited.push(`${i},${start.y}`);
      }

      for (let i = start.x; i > end.x; i--) {
        visited.push(`${i},${start.y}`);
      }
    }

    const duplicates = visited.filter(
      (item, index) => visited.indexOf(item) !== index
    );

    if (duplicates.length > 0) {
      const firstDuplicate = duplicates[0];
      const [x, y] = firstDuplicate
        .split(",")
        .map((item) => parseInt(item, 10));
      const distance = calculateDistance(x, y);
      return distance.toString();
    }
  }

  return "0";
}

function calculateDistance(x: number, y: number): number {
  let xDiff = 0;
  let yDiff = 0;

  if (x < 0) xDiff = x * -1;
  else xDiff = x;

  if (y < 0) yDiff = y * -1;
  else yDiff = y;

  const distance = xDiff + yDiff;

  return distance;
}
