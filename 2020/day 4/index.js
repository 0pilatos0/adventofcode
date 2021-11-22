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

                /*part 2*/
                if(validateValue(proccessed[a][b][0], proccessed[a][b][1])){
                    correctvalues++;
                } else{
                    console.log(proccessed[a][b][0] + ': ' + proccessed[a][b][1]);
                }
                /*part 2 end*/

                /*part 1*/
                // correctvalues++;
                /*part 1 end*/
            }
        }
    }
    if(correctvalues === 7){
        score++;
    }
    
}
/*part 2*/
function validateValue(type, value){
    if(type === 'byr'){
        if(value >= 1920 && value <= 2002){
            return true;
        }
    }
    if(type === 'iyr'){
        if(value >= 2010 && value <= 2020){
            return true;
        }
    }
    if(type === 'eyr'){
        if(value >= 2020 && value <= 2030){
            return true;
        }
    }
    if(type === 'hgt'){
        if(value.includes('cm')){
            if(value.replace('cm', '') >= 150 && value.replace('cm', '') <= 193){
                return true;
            }
        }
        if(value.includes('in')){
            if(value.replace('in', '') >= 59 && value.replace('in', '') <= 76){
                return true;
            }
        }
    }
    if(type === 'hcl'){
        let tempvalue = value.split('');
        if(tempvalue.length === 7){
            if(tempvalue[0] === '#'){
                for(let a = 1; a < tempvalue.length; a++){                   
                        return true;    
                }
            }
        }
        
    }
    if(type === 'ecl'){
        if(value === 'amb' || value === 'blu' || value === 'brn' || value === 'gry' || value === 'grn' || value === 'hzl' || value === 'oth'){
            return true;
        }
    }
    if(type === 'pid'){
        if(value.length === 9){
            for(let a = 0; a < value.length; a++){
                if(!isNaN(value[a])){
                    return true;
                }
            }
        }
    }
    return false;   
}
/*part 2 end*/

console.log(score);
