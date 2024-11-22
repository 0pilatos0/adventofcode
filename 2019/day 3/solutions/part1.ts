export function part1(input: string): string {
  const [wire1, wire2] = input.split("\n").map((line) => line.split(","));

  const wire1Set = new Set(getWirePoints(wire1));
  const wire2Set = new Set(getWirePoints(wire2));

  const intersections = Array.from(wire1Set).filter((point) => wire2Set.has(point));

  const distances = intersections.map((point) => {
    return manHattanDistance(point);
  });

  return Math.min(...distances).toString();

  function manHattanDistance(point: string): number {
    const [x, y] = point.split(",").map((coord) => parseInt(coord));
    return Math.abs(x) + Math.abs(y);
  }

  function getWirePoints(wire: string[]): string[] {
    const points: string[] = [];
    let x = 0;
    let y = 0;

    for (const instruction of wire) {
      const direction = instruction[0];
      const distance = parseInt(instruction.slice(1));

      for (let i = 0; i < distance; i++) {
        switch (direction) {
          case "U":
            y++;
            break;
          case "D":
            y--;
            break;
          case "L":
            x--;
            break;
          case "R":
            x++;
            break;
        }
        points.push(`${x},${y}`);
      }
    }

    return points;
  }
}
