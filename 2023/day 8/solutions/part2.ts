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

  let positions = maps
    .filter((map) => map.key.endsWith("A"))
    .map((map) => map.key);

  console.log(positions);

  let steps = 0;
  let directionsIndex = 0;

  let foundZZZ = false;
  while (!foundZZZ) {
    steps++;

    let newPositions: string[] = [];

    positions.forEach((position) => {
      let map = maps.find((map) => map.key === position);

      if (map) {
        if (directions[directionsIndex] === "Left") {
          newPositions.push(map.left);
        } else {
          newPositions.push(map.right);
        }
      }
    });

    positions = newPositions;

    directionsIndex++;

    if (directionsIndex === directions.length) {
      directionsIndex = 0;
    }

    //if all positions end in a Z, we're done
    if (positions.every((position) => position.endsWith("Z"))) {
      break;
    }

    if (steps % 1000 === 0) {
      console.log(positions);
      //log how many steps are matching the ending with Z so we can see progress
      console.log(
        `${steps} steps: ${
          positions.filter((position) => position.endsWith("Z")).length
        } positions ending in Z`
      );
    }
  }

  return steps.toString();
}
