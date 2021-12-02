const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

let xpos = 0;
let ypos = 0;

// part1();
// part2();

function part1(){
    for(let i = 0; i < input.length; i++) {
        input[i] = input[i].split(' ');
        let direction = input[i][0];
        let distance = parseInt(input[i][1]);
        if(direction === 'forward'){
            xpos += distance;
        } else if(direction === 'down'){
            ypos += distance;
        } else if(direction === 'up'){
            ypos -= distance;
        }
    }
}


function part2(){
    let aim = 0;
    for(let i = 0; i < input.length; i++) {
        input[i] = input[i].split(' ');
        let direction = input[i][0];
        let distance = parseInt(input[i][1]);
        if(direction === 'forward'){
            xpos += distance;
            ypos += (aim * distance);
        } else if(direction === 'down'){
            aim += distance;
        } else if(direction === 'up'){
            aim -= distance;
        }
    }
}
console.log(xpos * ypos);