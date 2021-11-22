const fs = require('fs');
const data = fs.readFileSync('data.txt').toString().split('\n');
let whereami = 0;
let correct = [];


let grid = [];
for (var i = 0; i < data.length; i++) {
    data[i] = data[i].replace(/\r/g, '');
}
for(var i = 0; i < data.length; i++) {
    grid[i] = data[i].split('');
    
}
/* First part */
// correct[0] = 0;
// for(var i = 0; i < grid.length; i++) {
//     if (grid[i][whereami] === '#') {
//         correct[0]++;
//     }
//     whereami = whereami + 3;
//     if (whereami >= grid[i].length) {
//         let tomuch = whereami - grid[i].length;
//         whereami = 0 + tomuch; 
//     }
// }
// console.log(correct[0]);
/* End of first part */

/* Second part */
let slopes = [1, 3, 5, 7, 1];
let slopes2 = [1, 1, 1, 1, 2]

for(var a = 0; a < slopes.length; a++) {
    correct[a] = 0;
    whereami = 0;
    for(var i = 0; i < grid.length; i = i + slopes2[a]) {
        if (grid[i][whereami] === '#') {
            correct[a]++;
        }
        whereami = whereami + slopes[a];
        console.log(whereami);
        if (whereami >= grid[i].length) {
            let tomuch = whereami - grid[i].length;
            whereami = 0 + tomuch; 
        }
    }
    console.log(correct[a]);
}
let total = 1;
for(var i = 0; i < correct.length; i++) {
    total = total * correct[i];
}
console.log(correct);
console.log(total);
/* End of second part */


