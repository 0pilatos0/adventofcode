export function part2(input: unknown): string {
  const lines = (input as string).trim().split('\n');
  
  interface Instruction {
    direction: string;
    distance: number;
  }
  
  const instructions: Instruction[] = lines.map(line => {
    const match = line.match(/^[UDLR] \d+ \(#([0-9a-f]{6})\)$/);
    if (!match) throw new Error(`Invalid line format: ${line}`);
    
    const hex = match[1];
    const distanceHex = hex.substring(0, 5);
    const directionCode = hex.substring(5);
    
    const distance = parseInt(distanceHex, 16);
    const directionMap: Record<string, string> = { '0': 'R', '1': 'D', '2': 'L', '3': 'U' };
    const direction = directionMap[directionCode];
    
    if (!direction) throw new Error(`Invalid direction code: ${directionCode}`);
    
    return { direction, distance };
  });

  const vertices: [number, number][] = [[0, 0]];
  let x = 0, y = 0;
  let perimeter = 0;
  
  for (const instruction of instructions) {
    const { direction, distance } = instruction;
    perimeter += distance;
    
    switch (direction) {
      case 'U': y -= distance; break;
      case 'D': y += distance; break;
      case 'L': x -= distance; break;
      case 'R': x += distance; break;
      default: throw new Error(`Unknown direction: ${direction}`);
    }
    
    vertices.push([x, y]);
  }

  let shoelaceArea = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    const [x1, y1] = vertices[i];
    const [x2, y2] = vertices[i + 1];
    shoelaceArea += x1 * y2 - x2 * y1;
  }
  shoelaceArea = Math.abs(shoelaceArea) / 2;

  const totalArea = shoelaceArea + perimeter / 2 + 1;

  return totalArea.toString();
}
