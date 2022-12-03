const fs = require('fs');

// const inputFile = "input.txt";
const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8').split('\n');


/* PART 1 */
function part1() {

    let dupedLetters = [];
    let totalpoints = 0;
    let alfabeth = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    input.forEach(line => {
        let firstHalf = line.slice(0, line.length / 2).split('');
        let secondHalf = line.slice(line.length / 2, line.length).split('');


        let rowDupedLetters = [];

        for (let i = 0; i < firstHalf.length; i++) {
            if (secondHalf.includes(firstHalf[i])) {
                if (!rowDupedLetters.includes(firstHalf[i])) {
                    rowDupedLetters.push(firstHalf[i]);
                }
            }
        }
        dupedLetters.push(rowDupedLetters);
    });

    dupedLetters.forEach(letter => {
        letter.forEach(l => {
            totalpoints += alfabeth.indexOf(l) + 1;
        });
    });

    return totalpoints;

}


/* PART 2 */
function part2() {
    let points = 0;
    let badges = [];
    let alfabeth = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    for (let i = 0; i < input.length; i += 3) {

        let badge = "";

        let first = input[i].trim().split('');
        let second = input[i + 1].trim().split('');
        let third = input[i + 2].trim().split('');

        first.forEach((letter, index) => {
            if (second.includes(letter) && third.includes(letter)) {
                badge = letter;
            }
        });

        if (badge !== "") {
            badges.push(badge);
        }
    }

    badges.forEach(letter => {
        points += alfabeth.indexOf(letter) + 1;
    });

    return points;
}


console.log("Part 1: " + part1());
console.log("Part 2: " + part2());