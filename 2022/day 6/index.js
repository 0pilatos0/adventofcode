const fs = require('fs');

const inputFile = "input.txt";
// const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8');


/* PART 1 */
async function part1() {
    let characters = input.trim().split('')
    let last4 = [];
    let position = 0;

    for (let i = 0; i < characters.length; i++) {
        if (last4.length === 4 && areAllValuesUnique(last4)) return position;
        if (last4.length === 4) last4.shift();
        
        position++;
        last4.push(characters[i]);
    }
}



/* PART 2 */
async function part2() {
    let characters = input.trim().split('')
    let last14 = [];
    let position = 0;

    for (let i = 0; i < characters.length; i++) {
        if (last14.length === 14 && areAllValuesUnique(last14)) return position;
        if (last14.length === 14) last14.shift();
        
        position++;
        last14.push(characters[i]);
    }

}

function areAllValuesUnique(array) {
    return array.every(function (value) {
        return array.indexOf(value) === array.lastIndexOf(value);
    });
}


async function main() {
    console.log("1️⃣ Part 1: " + await part1());
    console.log("2️⃣ Part 2: " + await part2());
}



main();