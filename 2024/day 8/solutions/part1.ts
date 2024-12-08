export function part1(input: string): string {
  const matrix = input.split("\n").map((line) => line.trim().split(""));
  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;

  type Antenna = {
    x: number;
    y: number;
  };

  type AntennaGroup = {
    type: string;
    antennas: Antenna[];
  };

  const antennas: AntennaGroup[] = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const cell = matrix[y][x];

      if (cell !== ".") {
        let antennaGroup = antennas.find((antennaGroup) => antennaGroup.type === cell);

        if (!antennaGroup) {
          antennaGroup = {
            type: cell,
            antennas: [],
          };

          antennas.push(antennaGroup);
        }

        antennaGroup.antennas.push({ x, y });
      }
    }
  }

  const antiNodes = new Map<string, { x: number; y: number }>();

  for (let i = 0; i < antennas.length; i++) {
    const antennaGroup = antennas[i];
    for (let j = 0; j < antennaGroup.antennas.length; j++) {
      const antenna = antennaGroup.antennas[j];

      for (let k = 0; k < antennaGroup.antennas.length; k++) {
        if (k === j) {
          continue;
        }

        const otherAntenna = antennaGroup.antennas[k];
        const antiNodeX = antenna.x + (antenna.x - otherAntenna.x);
        const antiNodeY = antenna.y + (antenna.y - otherAntenna.y);

        if (antiNodeX < 0 || antiNodeX >= matrixWidth || antiNodeY < 0 || antiNodeY >= matrixHeight) {
          continue;
        }

        const key = `${antiNodeX},${antiNodeY}`;

        if (antiNodes.has(key)) {
          continue;
        }

        antiNodes.set(key, { x: antiNodeX, y: antiNodeY });
      }
    }
  }

  return antiNodes.size.toString();
}
