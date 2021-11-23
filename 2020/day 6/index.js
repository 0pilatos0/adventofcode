const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

part2();
function part1(){
    let groups = [];
    let counter = 0;
    let awnsers = 0;
    for(let i = 0; i < input.length; i++) {
        if(input[i] === '') {
            counter++;
        } else{
            groups[counter] = groups[counter] || [];
            groups[counter].push(input[i]);
        }
    }
    for(let i = 0; i < groups.length; i++) {
        groups[i] = groups[i].join('');
        groups[i] = groups[i].split('');

        let templetters = [];
        for(let j = 0; j < groups[i].length; j++) {
            if(!templetters.includes(groups[i][j])) {
                templetters.push(groups[i][j]);
            }
        }
        awnsers = awnsers + templetters.length;
    }
    console.log(awnsers);
}
function part2(){
    let groups = [];
    let counter = 0;
    let awnsers = 0;
    for(let i = 0; i < input.length; i++) {
        if(input[i] === '') {
            counter++;
        } else{
            groups[counter] = groups[counter] || [];
            groups[counter].push(input[i]);
        }
    }
    for(let i = 0; i < groups.length; i++) {
        
        for(let j = 0; j < groups[i].length; j++) {
            let templetters = [];
            groups[i][j] = groups[i][j].split('');
            console.log(groups[i][j]);
            
        }
    }
}


