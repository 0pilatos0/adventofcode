const fs = require('fs');

// const inputFile = "input.txt";
const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8').split('\n');


/* PART 1 */
function part1() {
    let mostCalories = 0;
    let currentCalories = 0;

    input.forEach(calorie => {
        calorie = parseInt(calorie);

        if (currentCalories > mostCalories) {
            mostCalories = currentCalories;
        }

        if (isNaN(calorie)) {
            currentCalories = 0;
        } else {
            currentCalories += calorie;
        }
    });

    return mostCalories;
}


/* PART 2 */
function part2() {
    let mostCalories = [0, 0, 0]
    let currentCalories = 0;

    input.forEach(calorie => {
        calorie = parseInt(calorie);

        if (isNaN(calorie)) {
            let lowest = mostCalories.indexOf(Math.min(...mostCalories));
            if (currentCalories > mostCalories[lowest]) {
                mostCalories[lowest] = currentCalories;
            }

            currentCalories = 0;
        } else {
            currentCalories += calorie;
        }
    });
    return mostCalories.reduce((a, b) => a + b, 0);
}


console.log("Part 1: " + part1());
console.log("Part 2: " + part2());