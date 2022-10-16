var fs = require("fs");
var data = fs.readFileSync("data.txt");
var data = data.toString();
var data = data.split("\r\n");

data.map((item, index) => {
  data[index] = item.split("");
});

/* Part 1 */
let doubles = 0;
let triples = 0;

data.forEach((item) => {
  let mapper = {};
  item.forEach((letter) => {
    mapper[letter] = mapper[letter] !== undefined ? mapper[letter] + 1 : 1;
  });

  let mappers = new Set(Object.values(mapper));

  if (mappers.has(2)) {
    doubles++;
  }

  if (mappers.has(3)) {
    triples++;
  }
});

console.log(doubles * triples);
