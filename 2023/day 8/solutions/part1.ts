export function part1(input: string): string {
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

  let position = "AAA";
  let steps = 0;
  let directionsIndex = 0;

  let foundZZZ = false;
  while (!foundZZZ) {
    let map = maps.find((map) => map.key === position);

    if (map?.key === "ZZZ") {
      break;
    }

    if (map) {
      if (directions[directionsIndex] === "Left") {
        position = map.left;
      } else {
        position = map.right;
      }

      steps++;
      directionsIndex++;

      if (directionsIndex === directions.length) {
        directionsIndex = 0;
      }
    }
  }

  return steps.toString();
}
