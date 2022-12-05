const fs = require('fs');

const inputFile = "input.txt";
// const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8');


/* PART 1 */
async function part1() {

    let stacksInput = input.split('\n\n')[0].split('\n').map(line => line.split(''));

    let stacks = {}
    let indexes = stacksInput[stacksInput.length - 1];
    stacksInput.pop();
    for (let i = 0; i < indexes.length; i++) {
        let element = indexes[i];
        if (!isNaN(element) && element !== " ") {
            stacks[element] = [];
        }
    }

    for (let i = 0; i < stacksInput.length; i++) {
        let line = stacksInput[i];
        //group line into groups of 3 with one empty space in between
        let groups = [];
        for (let j = 0; j < line.length; j += 4) {
            groups.push(line.slice(j, j + 3));
        }

        for (let j = 0; j < groups.length; j++) {
            if (groups[j][0] !== " ") {
                stacks[j + 1].push(groups[j][1]);
            }
        }
    }

    //invert each stack
    for (let key in stacks) {
        // Reverse the array for the current key
        stacks[key] = stacks[key].reverse();
    }



    let instructions = input.split('\n\n')[1].split('\n');

    instructions.forEach(instruction => {
        let ammountOfTimes = instruction.split(' ')[1];
        let from = instruction.split(' ')[3];
        let to = instruction.split(' ')[5];

        for (let i = 0; i < ammountOfTimes; i++) {
            stacks[to].push(stacks[from].pop());
        }
    });



    let result = "";
    for (let key in stacks) {
        result += stacks[key].pop();
    }
    return result;
}



/* PART 2 */
async function part2() {
    let stacksInput = input.split('\n\n')[0].split('\n').map(line => line.split(''));

    let stacks = {}
    let indexes = stacksInput[stacksInput.length - 1];
    stacksInput.pop();
    for (let i = 0; i < indexes.length; i++) {
        let element = indexes[i];
        if (!isNaN(element) && element !== " ") {
            stacks[element] = [];
        }
    }

    for (let i = 0; i < stacksInput.length; i++) {
        let line = stacksInput[i];
        //group line into groups of 3 with one empty space in between
        let groups = [];
        for (let j = 0; j < line.length; j += 4) {
            groups.push(line.slice(j, j + 3));
        }

        for (let j = 0; j < groups.length; j++) {
            if (groups[j][0] !== " ") {
                stacks[j + 1].push(groups[j][1]);
            }
        }
    }

    //invert each stack
    for (let key in stacks) {
        // Reverse the array for the current key
        stacks[key] = stacks[key].reverse();
    }

    let instructions = input.split('\n\n')[1].split('\n');


    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i];
        let ammountOfTimes = instruction.split(' ')[1];
        let from = instruction.split(' ')[3];
        let to = instruction.split(' ')[5];
      
        let items = stacks[from].splice(-ammountOfTimes);
        stacks[to] = stacks[to].concat(items);
      

        let progressBar = "";
        for (let j = 0; j < 100; j++) {
            if (j < (i / instructions.length) * 100) {
                progressBar += "█";
            } else {
                progressBar += "░";
            }
        }

        process.stdout.moveCursor(0, -11);
        process.stdout.clearScreenDown();
        process.stdout.cursorTo(0);

        for(stack in stacks) {
            process.stdout.write(stack + ": " + stacks[stack].join('') + "\n");
        }
        process.stdout.write(progressBar);

        // delay for 1000ms / 30 = 33.333ms
        await new Promise(resolve => setTimeout(resolve, 33.333));
      }
      
      console.log("");

    let result = "";
    for (let key in stacks) {
        result += stacks[key].pop();
    }
    return result;
}

async function visualise(stacks) {
    for (stack in stacks) {
        console.log(stack + ": " + stacks[stack]);
    }
}


async function main() {
    console.log("Part 1: " + await part1());
    console.log("👌 Part 2: " + await part2());
}



main();