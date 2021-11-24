const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n');
const regex = /((?<number>\d+) )?(?<color>.*)/;

const map = new Map();
const colors = map.keys()
let totalcolors = 0;

function containGold(color) {
    if(color === 'shiny gold'){
        return true;
    }
    if(!map.has(color)){
        return false;
        
    }
    const bagsInBags = map.get(color);
    for(let {color: bag} of bagsInBags){
        if(containGold(bag)){
            return true;
        }
    }
    return false;
}

for (let line of input) {
    let [bag, bags] = line.split(' bags contain ');
    bags = bags.replace(/\./, '');
    bags = bags.split(', ');

    bags.map(txt => {
        txt = txt.replace(/ bags?/, '')
        const {groups} =  regex.exec(txt);
        if(!map.has(bag)) {
            map.set(bag, []);
        }
        if(!groups.number){
            groups.number = 0;
        }
        map.set(bag, [...map.get(bag), groups]);
    });
}

for (let color of colors) {
    if(containGold(color) && color != 'shiny gold'){
        totalcolors++;
    }
}

console.log('Part 1 awnser: '+totalcolors);

// Part 2

function countBags(topBag) {
    if(topBag.number == 0) {
        return 0;
    }
    const bagsInBags = map.get(topBag.color);
    let sum = 1;
    for(let bag of bagsInBags){
        if(countBags(bag)){
            sum += bag.number * countBags(bag);
        }
    }
    return sum
}
let part2awnser = countBags({number: 1, color: 'shiny gold'}) -1
console.log('Part 2 Awnser : ' + part2awnser);
