const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').toString().split('\r\n');
part2();

function part1() {
    let gamma = '';
    let epsilon = '';
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split('');
    }
    for (let a = 0; a < data[0].length; a++) {
        let ones = 0;
        let zeros = 0;
        for (let b = 0; b < data.length; b++) {
            if (data[b][a] === '1') {
                ones++;
            } else if (data[b][a] === '0') {
                zeros++;
            }
        }
        //log wich is bigger ones or zeros
        if (ones > zeros) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }

    }

    let gammaInt = parseInt(gamma, 2);
    let epsilonInt = parseInt(epsilon, 2);

    console.log(gammaInt * epsilonInt);
}

function part2() {
    let co2Calculated = data;
    let oxygenCalculated = data;
    let mostFrequent = '';
    let leastFrequent = '';

    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split('');
    }

    for(let index = 0; index < data[0].length; index++) {
        if(oxygenCalculated.length > 1){
            const counted = getCounts(oxygenCalculated, index);
            if(counted[0] > counted[1]){
                mostFrequent = '0';
            } else {
                mostFrequent = '1';
            }
            oxygenCalculated = oxygenCalculated.filter((num) => num[index] === mostFrequent);
        }
    }

    for(let index2 = 0; index2 < data[0].length; index2++) {
        if(co2Calculated.length > 1){
            const counted = getCounts(co2Calculated, index2);
            if(counted[1] >= counted[0]){
                leastFrequent = '0';
            } else {
                leastFrequent = '1';
            }
            co2Calculated = co2Calculated.filter((num) => num[index2] === leastFrequent);
        }
    }

    function getCounts(array, pos) {
        let counts = {
            0: 0,
            1: 0
        };
        for (let i = 0; i < array.length; i++) {
            counts[array[i][pos]]++;
        }
        return counts;
    }

    let oxygen = oxygenCalculated[0].join("");
    let co2 = co2Calculated[0].join("");

    oxygen = parseInt(oxygen, 2);
    co2 = parseInt(co2, 2);

    console.log(oxygen * co2);
}