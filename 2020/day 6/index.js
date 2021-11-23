const fs = require('fs');
let input = fs.readFileSync('input.txt', 'utf8');

part2();

function part1() {
    input = input.split('\r\n')
    let groups = [];
    let counter = 0;
    let awnsers = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            counter++;
        } else {
            groups[counter] = groups[counter] || [];
            groups[counter].push(input[i]);
        }
    }
    for (let i = 0; i < groups.length; i++) {
        groups[i] = groups[i].join('');
        groups[i] = groups[i].split('');

        let templetters = [];
        for (let j = 0; j < groups[i].length; j++) {
            if (!templetters.includes(groups[i][j])) {
                templetters.push(groups[i][j]);
            }
        }
        awnsers = awnsers + templetters.length;
    }
    console.log(awnsers);
}

function part2() {
    let unsortedAnswers = input.split('\r\n');
    console.log(unsortedAnswers);
    let totalAnswers = 0;

    let sortedAnswers = [];
    let temp = [];

    for (let i = 0; i < unsortedAnswers.length; i++) {
        if (unsortedAnswers[i] !== '') {
            temp.push(unsortedAnswers[i]);
        }

        if (i === unsortedAnswers.length - 1 || unsortedAnswers[i] == '') {
            sortedAnswers.push(temp);
            temp = [];
        }
    }

    sortedAnswers.forEach(answers => {
        const combinedAnswers = answers.join('');
        const distinctAnswers = [...new Set(combinedAnswers.split(''))];

        for (let i = 0; i < distinctAnswers.length; i++) {
            const answer = distinctAnswers[i];

            if (answers.every(x => x.includes(answer))) totalAnswers += 1;
        }

    });

    console.log(totalAnswers);
}