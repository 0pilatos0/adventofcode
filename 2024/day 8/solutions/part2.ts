export function part2(input: string): string {
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

        antiNodes.set(`${antenna.x},${antenna.y}`, { x: antenna.x, y: antenna.y });
        antiNodes.set(`${otherAntenna.x},${otherAntenna.y}`, { x: otherAntenna.x, y: otherAntenna.y });

        let diffX = antenna.x - otherAntenna.x;
        let diffY = antenna.y - otherAntenna.y;

        let originalDiffX = diffX;
        let originalDiffY = diffY;

        while (true) {
          let antiNodeX = antenna.x + diffX;
          let antiNodeY = antenna.y + diffY;

          if (antiNodeX < 0 || antiNodeX >= matrixWidth || antiNodeY < 0 || antiNodeY >= matrixHeight) {
            break;
          }

          const antiNodeKey = `${antiNodeX},${antiNodeY}`;
          if (!antiNodes.has(antiNodeKey)) {
            antiNodes.set(antiNodeKey, { x: antiNodeX, y: antiNodeY });
          }
          diffX += originalDiffX;
          diffY += originalDiffY;
        }
      }
    }
  }

  return antiNodes.size.toString();
}
