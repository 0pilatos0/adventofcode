export function part1(input: string): string {
  type Race = {
    time: number;
    distance: number;
  };
  const lines = input.split("\n").map((x) => x.split(/\s+/));

  lines[0].shift();
  lines[1].shift();

  let races: Race[] = [];
  for (let i = 0; i < lines[0].length; i++) {
    let time = Number(lines[0][i]);
    let distance = Number(lines[1][i]);

    let race = {
      time,
      distance,
    };

    races.push(race);
  }

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
