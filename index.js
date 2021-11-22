var fs = require('fs');
var data = fs.readFileSync('data');
var data = data.toString();
var data = data.split('\n');

for (var i = 0; i < data.length; i++) {
    data[i] = data[i].replace(/\r/g, '');    
}
for (var i = 0; i < data.length; i++) {
    data[i] = parseInt(data[i]);
}

for(var a = 0; a < data.length; a++) {
    for(var b = 0; b < data.length; b++) {
        let calculated = data[a] + data[b];
        if(calculated === 2020){
            console.log(data[a] * data[b]);
        }
    }
}
