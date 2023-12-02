export function part1(input: string): string {
  let sumOfValidGames = 0;
  let redThreshold = 12;
  let greenThreshold = 13;
  let blueThreshold = 14;

  const lines = input.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let mightbeValid = true;
    const partsObj = line.split(": ")[1].split(/[;,]/g);
    partsObj.forEach((part) => {
      const partArr = part.trim().split(" ");
      const partColor = partArr[1];
      const partNumber = parseInt(partArr[0]);

      if (
        (partColor === "red" && partNumber > redThreshold) ||
        (partColor === "green" && partNumber > greenThreshold) ||
        (partColor === "blue" && partNumber > blueThreshold)
      )
        mightbeValid = false;
    });

    if (mightbeValid) {
      sumOfValidGames += parseInt(line.split(" ")[1].split(":")[0]);
    }
  }
  return sumOfValidGames.toString();
}
