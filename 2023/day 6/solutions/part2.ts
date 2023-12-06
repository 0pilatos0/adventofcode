export function part2(input: string): string {
  type Race = {
    time: number;
    distance: number;
  };
  const lines = input.split("\n").map((x) => x.split(/\s+/));

  lines[0].shift();
  lines[1].shift();

  lines[0][0] = lines[0].join("");
  lines[1][0] = lines[1].join("");

  let race = {
    time: Number(lines[0][0]),
    distance: Number(lines[1][0]),
  };

  let races: Race[] = [];
  races.push(race);

  let possibleRaces = [];

  for (let raceIndex = 0; raceIndex < races.length; raceIndex++) {
    let race = races[raceIndex];
    let winCount = 0;
    for (
      let holdingDownTime = 0;
      holdingDownTime <= race.time;
      holdingDownTime++
    ) {
      let timeLeft = race.time - holdingDownTime;
      let distanceReached = holdingDownTime * timeLeft;

      if (distanceReached > race.distance) {
        winCount++;
      }
    }

    possibleRaces.push(winCount);
  }

  return possibleRaces.reduce((a, b) => a * b).toString();
}
