const fs = require("fs");

const lines = fs.readFileSync("input.txt", "utf8").split("\r\n").filter(Boolean);

function median(array) {
    const internalArray = [...array];
    internalArray.sort((a, b) => a - b);
    if (internalArray.length % 2 === 0) {
        return (
            (internalArray[internalArray.length / 2 - 1] +
                internalArray[internalArray.length / 2]) /
            2
        );
    } else {
        return internalArray[Math.floor(internalArray.length / 2)];
    }
}

function part1() {
    const closingChar = {
        "(": ")",
        "{": "}",
        "[": "]",
        "<": ">",
    };
    const point = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
    };
    const found = {
        ")": 0,
        "]": 0,
        "}": 0,
        ">": 0,
    };

    for (const line of lines) {
        const stack = [];
        for (let i = 0; i < line.length; i++) {
            const element = line[i];
            if (/[({\[<]/.test(element)) {
                stack.push(closingChar[element]);
            } else {
                const expected = stack.pop();
                if (expected !== element) {
                    found[element]++;
                    break;
                }
            }
        }
    }

    const score = Object.keys(found)
        .map((key) => point[key] * found[key])
        .reduce((a, b) => a + b, 0);
    console.log(score);
}

part1();

function part2() {
    const closingChar = {
        "(": ")",
        "{": "}",
        "[": "]",
        "<": ">",
    };
    const points = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
    };
    const scores = [];

    for (const line of lines) {
        const stack = [];
        let corrupted = false;
        for (let i = 0; i < line.length; i++) {
            const element = line[i];
            if (/[({\[<]/.test(element)) {
                stack.push(closingChar[element]);
            } else {
                const expected = stack.pop();
                if (expected !== element) {
                    corrupted = true;
                    break;
                }
            }
        }
        if (!corrupted && stack.length > 0) {
            const closingChars = stack.reverse().join("");
            let score = 0;
            for (let i = 0; i < closingChars.length; i++) {
                const element = closingChars[i];
                score *= 5;
                score += points[element];
            }
            scores.push(score);
        }
    }
    console.log(median(scores));
}

part2();