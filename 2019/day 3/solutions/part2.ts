export function part2(input: string): string {
  const [wire1, wire2] = input.split("\n").map((line) => line.split(","));

  const wire1Points = getWirePoints(wire1);
  const wire2Points = getWirePoints(wire2);

  const wire1Steps = new Map<string, number>();
  wire1Points.forEach((point, index) => {
    if (!wire1Steps.has(point)) {
      wire1Steps.set(point, index + 1);
    }
  });

  const wire2Steps = new Map<string, number>();
  wire2Points.forEach((point, index) => {
    if (!wire2Steps.has(point)) {
      wire2Steps.set(point, index + 1);
    }
  });

  const intersections = Array.from(new Set(wire1Points)).filter((point) => wire2Steps.has(point));

  const combinedSteps = intersections.map((point) => {
    return (wire1Steps.get(point) || 0) + (wire2Steps.get(point) || 0);
  });

  return Math.min(...combinedSteps).toString();

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
