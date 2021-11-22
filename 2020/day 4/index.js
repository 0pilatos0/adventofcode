const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const inputArray = input.split('\n');
console.log(inputArray);

const values = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

let index = 0;
let proccessed = [];
let score = 0;
for(let a = 0; a < inputArray.length; a++){
    if(inputArray[a] === '\r'){
        index++;
    } else{
        if(proccessed[index] === undefined){
            proccessed[index] = inputArray[a];
        } else{
            proccessed[index] = proccessed[index] + inputArray[a];
        }
    }
}
for(let a = 0; a < proccessed.length; a++){

    proccessed[a] = proccessed[a].replace(/(\r\n|\n|\r)/gm, " ") 
    proccessed[a] = proccessed[a].split(' ');
    let correctvalues = 0;
    for(let b = 0; b < proccessed[a].length; b++){
        if(proccessed[a][b] === ''){
            proccessed[a].pop();
        } else{
            proccessed[a][b] = proccessed[a][b].split(':');
            if(values.includes(proccessed[a][b][0])){
                correctvalues++;
            }
        }
    }
    if(correctvalues === 7){
        score++;
    }
    
}

console.log(score);
