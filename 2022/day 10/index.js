const fs = require('fs');

const inputFile = "input.txt";
// const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8').trim().split("\r\n");


/* PART 1 */
async function part1() {
  let cycleNumber = 0;
  let cycleResult = 1;
  let inputIndex = 0;
  let lastIncreased = false;
  let cyclesCounted = []

  let strength = 0;
  while (true) {
    strength += calculateStrength(cycleNumber, cycleResult, cyclesCounted);
    cycleNumber++;
    strength += calculateStrength(cycleNumber, cycleResult, cyclesCounted);

    if (input[inputIndex] === undefined) break;
    if (input[inputIndex] === "noop") {
      inputIndex++;
    } else {
      if (lastIncreased) {
        cycleNumber++;

        let [operation, argument] = input[inputIndex].split(" ");
        argument = Number(argument);

        cycleResult += argument;

        inputIndex++;
      } else {
        lastIncreased = true;
      }
    }
  }

  return strength;

  function calculateStrength() {
    if (cycleNumber === 20 || (cycleNumber - 20) % 40 === 0) {

      if (cyclesCounted.includes(cycleNumber)) return 0;
      console.log(cycleNumber, cycleResult);
      cyclesCounted.push(cycleNumber);
      return (cycleResult * cycleNumber);
    }
    return 0;
  }
}

/* PART 2 */
async function part2() {
  let counter = 0;
  let x = 1;
  const screen = Array.from({
      length: 6
    }, () =>
    Array.from({
      length: 40
    }, () => ".")
  );

  const draw = () => {
    const cnt = counter - 1;
    if (cnt % 40 >= x - 1 && cnt % 40 <= x + 1) {
      screen[Math.trunc(cnt / 40)][cnt % 40] = "#";
    }
  };

  let inputIndex = 0;
  let lastIncreased = false;
  while (true) {
    counter++;
    draw();

    if (input[inputIndex] === undefined) break;
    if (input[inputIndex] === "noop") {
      inputIndex++;
    } else {
      if (lastIncreased) {
        counter++;
        let [operation, argument] = input[inputIndex].split(" ");
        argument = Number(argument);
        x += argument;
        draw();
        inputIndex++;
      } else {
        lastIncreased = true;
      }
    }
  }

  const result = screen.map((x) => x.join("")).join("\n");

  console.log(result);
}

async function main() {
  console.log("1️⃣ Part 1: " + await part1());
  console.log("2️⃣ Part 2: ");
  await part2();
}

main();