const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(',').map(Number);
const daystocount = 256;

function fishCalculator(input, days){
    let count = {};
    for(let i = 0; i < 9; i++){
        count[i] = 0;
    }
    for(let d = 0; d < input.length; d++){
        count[input[d]]++;
    }

    for(let a = 0; a < days; a++){
        let newcount = {};
        for(let i = 0; i < 9; i++){
            newcount[i] = 0;
        }
        Object.keys(count).map(key => {
            let value = count[key]
            if(key > 0){
                newcount[key - 1] += value
            }
            else{
                newcount[6] += value
                newcount[8] += value
            }
        })
        count = newcount;
    }
    let amount = 0

    for(let z = 0; z < 9; z++){
        amount += count[z]
    }

    console.log(amount)
}

fishCalculator(input, daystocount);