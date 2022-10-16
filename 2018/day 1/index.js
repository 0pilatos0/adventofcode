var fs = require("fs");
var data = fs.readFileSync("data.txt");
var data = data.toString();
var data = data.split("\n");

for (var i = 0; i < data.length; i++) {
  data[i] = data[i].replace(/\r/g, "");
  data[i] = parseInt(data[i]);
}

/* First part */
let total = 0;
for (var a = 0; a < data.length; a++) {
  total += data[a];
}

console.log(total);

/* Second part */
let frequencies = [];
let frequency = 0;

for (var i = 0; i < data.length; i++) {
  frequency += data[i];
  if (frequencies.includes(frequency)) {
    console.log(frequency);
    break;
  } else {
    frequencies.push(frequency);
  }

  if (i === data.length - 1) {
    i = -1;
  }
}
