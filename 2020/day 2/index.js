var fs = require('fs');
var data = fs.readFileSync('data.txt').toString().split('\n');
var correct = 0;
for (var i = 0; i < data.length; i++) {
    data[i] = data[i].replace(/\r/g, '');       
}

for (var i = 0; i < data.length; i++) {
    
    var min = data[i].split('-')[0];
    var max = data[i].split('-')[1];
    var min = min.split(' ')[0];
    var max = max.split(' ')[0];
    min = parseInt(min);
    max = parseInt(max);

    var letter = data[i].split(' ')[1].split('')[0];

    var password = data[i].split(' ')[2];
    var password = password.split('');

    var templetter = 0;
    
    /* First part */
    // for (var j = 0; j < password.length; j++) {
    //     if (password[j] === letter) {
    //         templetter++;
    //     }
    // }
    
    // if (templetter >= min && templetter <= max) {
    //     correct++;
    // }

    /* Second part */
    if (password[min - 1] === letter) {
        templetter++;
    }
    if (password[max - 1] === letter) {
        templetter++;
    }
    if (templetter === 1){
        correct++;
    }

}
console.log(correct);

