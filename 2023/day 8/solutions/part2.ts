export function part2(input: string): string {
  const lines = input.split("\n\n");

  const directions = lines[0].split("").map((direction) => {
    return direction === "L" ? "Left" : "Right";
  });

  lines.shift();

  const maps = lines[0].split("\n").map((line) => {
    let key = line.split(" = ")[0];
    let left = line.split(" = (")[1].split(",")[0];
    let right = line.split(" = (")[1].split(", ")[1].split(")")[0];

    return { key, left, right };
  });

  type Runner = {
    currentPos: string;
    stepsSinceLastZ: number;
    lastStepsSinceLastZ: number;
    initialStepsSinceLastZ: number;
    stable: boolean;
  };

  let positions: Runner[] = maps
    .filter((map) => map.key.endsWith("A"))
    .map((map) => {
      return {
        currentPos: map.key,
        stepsSinceLastZ: 0,
        lastStepsSinceLastZ: 0,
        initialStepsSinceLastZ: 0,
        stable: false,
      };
    });

  let steps = 0;
  let directionsIndex = 0;

  let foundZZZ = false;
  while (!foundZZZ) {
    steps++;

    let newPositions: Runner[] = [];

    if (positions.every((position) => position.stable)) {
      console.log(positions);

      let lcm = positions[0].lastStepsSinceLastZ;
      for (let i = 1; i < positions.length; i++) {
        let b = positions[i].lastStepsSinceLastZ;
        let gcd = 1;

        for (let j = 1; j <= lcm && j <= b; j++) {
          if (lcm % j === 0 && b % j === 0) {
            gcd = j;
          }
        }

        lcm = (lcm * b) / gcd;
      }

      steps = lcm;
      break;
    }

    positions.forEach((position) => {
      let map = maps.find((map) => map.key === position.currentPos);

      if (map) {
        let newRunner: Runner = {
          currentPos: "",
          stepsSinceLastZ: position.stepsSinceLastZ + 1,
          lastStepsSinceLastZ: position.lastStepsSinceLastZ,
          initialStepsSinceLastZ: position.initialStepsSinceLastZ,
          stable: position.stable,
        };
        if (directions[directionsIndex] === "Left") {
          newRunner.currentPos = map.left;
        } else {
          newRunner.currentPos = map.right;
        }

        if (newRunner.currentPos.endsWith("Z")) {
          if (newRunner.stable === false) {
            newRunner.initialStepsSinceLastZ = newRunner.stepsSinceLastZ;
          }
          newRunner.lastStepsSinceLastZ = position.stepsSinceLastZ + 1;
          newRunner.stepsSinceLastZ = 0;
          newRunner.stable = true;
        }

        newPositions.push(newRunner);
      }
    });

    positions = newPositions;

    directionsIndex++;

    if (directionsIndex === directions.length) {
      directionsIndex = 0;
    }
  }

  return steps.toString();
}
