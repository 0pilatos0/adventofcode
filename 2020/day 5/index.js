const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\r\n').filter(x => x);

let ids = [];

function stringParser(str){
    return parseInt([...str].map(x => x === 'B' || x === 'R' ? 1 : 0).join(''), 2);
}
function getrow(string){
    return stringParser(string.slice(0, 7));
}
function getcolumn(string){
    return stringParser(string.slice(7));
}
function getseatid(row, column){
    return row * 8 + column;
}

for(let i = 0; i < input.length; i++){
    const row = getrow(input[i]);
    const column = getcolumn(input[i]);
    const seatid = getseatid(row, column);
    ids[i] = seatid;
}
ids.sort((a, b) => b - a);
console.log('highest seat : ' + ids[0]);

ids.sort((a, b) => a - b);
for(let i = 0; i < ids.length - 1; i++){
    if(ids[i+1] - ids[i] > 1){
        console.log('there is a extra place on : ' + (ids[i] + 1));
        break;
    }
}

