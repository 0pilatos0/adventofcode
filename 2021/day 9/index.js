const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').filter(Boolean);

function part1() {
    let risk = 0;
    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        for (let j = 0; j < line.length; j++) {
            const current = line[j];
            if (
                (!(i - 1 >= 0) || current < input[i - 1][j]) &&
                (!(i + 1 < input.length) || current < input[i + 1][j]) &&
                (!(j - 1 >= 0) || current < input[i][j - 1]) &&
                (!(j + 1 < line.length) || current < input[i][j + 1])
            ) {
                risk += Number(current) + 1;
            }

        }

    }
    console.log(risk);
}
part1();