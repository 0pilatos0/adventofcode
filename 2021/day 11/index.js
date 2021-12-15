const fs = require("fs");

const matrix = fs.readFileSync("input.txt", "utf8").split("\r\n").filter(Boolean).map((line) => [...line].map(Number));

let firstSynchronizedFlash;
let flashes = 0;
let turnCounter = 0;

function increaseEnergy({
    i,
    j,
    explodedSet
}) {
    if (typeof matrix[i] === "undefined") return;
    if (typeof matrix[i][j] === "undefined") return;

    const key = i + ":" + j;
    if (explodedSet.has(key)) {
        return;
    }

    matrix[i][j]++;
    if (matrix[i][j] > 9) {
        matrix[i][j] = 0;
        explodedSet.add(key);
        flashes++;

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x === 0 && y === 0) continue;

                increaseEnergy({
                    i: i + x,
                    j: j + y,
                    explodedSet
                });
            }
        }
        return;
    }
}

function turn() {
    turnCounter++;
    let explodedSet = new Set();

    for (let i = 0; i < matrix.length; i++) {
        const line = matrix[i];
        for (let j = 0; j < line.length; j++) {
            increaseEnergy({
                i,
                j,
                explodedSet
            });
        }
    }
    if (
        typeof firstSynchronizedFlash === "undefined" &&
        explodedSet.size === matrix.length * matrix[0].length
    ) {
        firstSynchronizedFlash = turnCounter;
    }
}
for (let i = 0; i < 100; i++) {
    turn();
}
console.log(flashes);

if (typeof firstSynchronizedFlash === "undefined") {
    while (typeof firstSynchronizedFlash === "undefined") {
        turn();
    }
}

console.log(firstSynchronizedFlash);