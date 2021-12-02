const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8').toString().split('\r\n');


function part1() {
    let acc = 0;
    let checked = [];
    for (let i = 0; i < input.length; i++) {
        if (checked.includes(i)) {
            console.log('We are done at ' + i);
            console.log('acc is ' + acc);
            break;
        }
        checked.push(i);
        input[i] = input[i].split(' ');
        let action = input[i][0];
        let number = parseInt(input[i][1]);

        if (action === 'nop') continue;
        if (action === 'acc') {
            acc += number;
        }
        if (action === 'jmp') {
            i += (number - 1);
        }
    }
}
