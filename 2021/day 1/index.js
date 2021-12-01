const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().split('\r\n');
part2();
function part1(){
    let counter = 0;

    for(let i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i]);
        if(data[i] > data[i-1]) {
            counter++;
        }
    }
    console.log(counter);
}
function part2(){
    let counter = 0;    
    for(let i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i]);
    }
    for(let i = 0; i < data.length; i++) {
        let temp1 = data[i] + data[i+1] + data[i+2];
        let temp2 = data[i+1] + data[i+2] + data[i+3];
        if (temp1 < temp2) {
            counter++;
        }
    }
    console.log(counter);
}
