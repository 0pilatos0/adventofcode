import chalk from "chalk";

export function part1(input: string): string {
  let seeds = input.split("\n")[0].split(": ")[1].split(" ").map(Number);
  type map = {
    from: string;
    to: string;
    mapEntries: MapEntry[];
  };

  type MapEntry = {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
  };

  let maps: map[] = [];

  let inputArray = input.split("\n\n").map((x) => x.split("\n"));
  inputArray.shift();

  inputArray.forEach((x) => {
    let from = x[0].split("-to-")[0];
    let to = x[0].split("-to-")[1].split(" ")[0];

    let mapEntries: MapEntry[] = [];
    x.shift();
    x.forEach((y) => {
      let destinationRangeStart = Number(y.split(" ")[0]);
      let sourceRangeStart = Number(y.split(" ")[1]);
      let rangeLength = Number(y.split(" ")[2]);

      mapEntries.push({
        destinationRangeStart,
        sourceRangeStart,
        rangeLength,
      });
    });

    let map: map = {
      from,
      to,
      mapEntries,
    };

    maps.push(map);
  });

  let lowestLocationNumber = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < seeds.length; i++) {
    let location = seeds[i];
    let map = maps.find((x) => x.from === "seed");
    while (map) {
      let oldLocation = location;
      let mapEntry = map.mapEntries.find(
        (x) =>
          location >= x.sourceRangeStart &&
          location <= x.sourceRangeStart + x.rangeLength
      );

      if (mapEntry) {
        location =
          mapEntry.destinationRangeStart +
          (location - mapEntry.sourceRangeStart);
      }

      console.log(
        chalk.yellow("mapped") + chalk.blue(` ${oldLocation} -> ${location}`)
      );

      if (map?.to === "location") {
        if (location < lowestLocationNumber) {
          lowestLocationNumber = location;
        }
        map = undefined;
      }

      map = maps.find((x) => x.from === map?.to);
    }

    console.log(chalk.red(`final seed location: ${location}`));
  }

  return lowestLocationNumber.toString();
}
