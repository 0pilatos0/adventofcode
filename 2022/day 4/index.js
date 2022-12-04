const fs = require('fs');

// const inputFile = "input.txt";
const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8').split('\n');


/* PART 1 */
function part1() {
    let totalOverlaps = 0;
    input.forEach((line, index) => {
        let firstElf = line.trim().split(',')[0];
        let secondElf = line.trim().split(',')[1];

        let firstElfStart = parseInt(firstElf.split('-')[0]);
        let firstElfEnd = parseInt(firstElf.split('-')[1]);

        let secondElfStart = parseInt(secondElf.split('-')[0]);
        let secondElfEnd = parseInt(secondElf.split('-')[1]);

        if (firstElfStart >= secondElfStart && firstElfEnd <= secondElfEnd) {
            totalOverlaps++;
        }
        if (secondElfStart >= firstElfStart && secondElfEnd <= firstElfEnd) {
            totalOverlaps++;
        }
    });

    return totalOverlaps;
}



/* PART 2 */
function part2() {
    let totalOverlaps = 0;
    input.forEach((line, index) => {
        let firstElf = line.trim().split(',')[0];
        let secondElf = line.trim().split(',')[1];

        let firstElfStart = parseInt(firstElf.split('-')[0]);
        let firstElfEnd = parseInt(firstElf.split('-')[1]);

        let secondElfStart = parseInt(secondElf.split('-')[0]);
        let secondElfEnd = parseInt(secondElf.split('-')[1]);

        if (firstElfEnd >= secondElfStart && secondElfEnd >= firstElfStart) {
            totalOverlaps++;
        } else if (secondElfEnd >= firstElfStart && firstElfEnd >= secondElfStart) {
            totalOverlaps++;
        }
    });
    return totalOverlaps
}


console.log("Part 1: " + part1());
console.log("Part 2: " + part2());