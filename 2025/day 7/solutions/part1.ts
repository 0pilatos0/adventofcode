export function part1(input: string): string {

  let totalSplits = 0;
  const SPLIT_POINT = "^";
  const START_MARKER = "S";
  const BEAM_MARKER = "|";


  let map = input.toString().split("\n").map(line => line.split(""));

  for (let y = 1; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y - 1][x] === BEAM_MARKER || map[y - 1][x] === START_MARKER){

        if (map[y][x] === SPLIT_POINT) {
          totalSplits++;
          map[y][x - 1] = BEAM_MARKER;
          map[y][x + 1] = BEAM_MARKER;
        } else {
          map[y][x] = BEAM_MARKER;
        }
      }
    }
  }

  return totalSplits.toString();

}