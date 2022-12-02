const fs = require('fs');

const inputFile = "input.txt";
// const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8').split('\r\n');


/* PART 1 */
function part1() {
    let points = 0;

    input.forEach(line => {
        let [opponent, me] = line.split(' ');



        switch (me) {
            case 'X':
                points += 1;
                break;
            case 'Y':
                points += 2;
                break;
            case 'Z':
                points += 3;
        }

        switch (me) {
            case 'X':
                if (opponent == 'A') points += 3;
                if (opponent == 'B') points += 0;
                if (opponent == 'C') points += 6;
                break;
            case 'Y':
                if (opponent == 'A') points += 6;
                if (opponent == 'B') points += 3;
                if (opponent == 'C') points += 0;
                break;
            case 'Z':
                if (opponent == 'A') points += 0;
                if (opponent == 'B') points += 6;
                if (opponent == 'C') points += 3; 
                break;
        }
    });
    return points;
}


/* PART 2 */
function part2() {
    let points = 0;

    input.forEach(line => {
        let [winCondition, me] = line.split(' ');

        switch (me) {
            case 'X':
                points += 0;
                break;
            case 'Y':
                points += 3;
                break;
            case 'Z':
                points += 6;
                break;
        }

        switch (me) {
            case 'X': //WIN
                if (winCondition == 'A') points += 3;
                if (winCondition == 'B') points += 1;
                if (winCondition == 'C') points += 2;
                break;
            case 'Y':
                if (winCondition == 'A') points += 1;
                if (winCondition == 'B') points += 2;
                if (winCondition == 'C') points += 3;
                break;
            case 'Z':
                if (winCondition == 'A') points += 2;
                if (winCondition == 'B') points += 3;
                if (winCondition == 'C') points += 1;
                break;
        }
    });
    return points;
}


console.log("Part 1: " + part1());
console.log("Part 2: " + part2());