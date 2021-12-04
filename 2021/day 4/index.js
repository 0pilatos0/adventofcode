const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8')

let data = input.split(/\r\n/).filter((a) => {
    return a.length > 0
})

let numbers = data[0].split(",")
let boards = [];
let markers = []

for (let i = 1; i < data.length; i += 5) {
    let b = [
        data[i].split(/\s/).filter((a) => a.length > 0),
        data[i + 1].split(/\s/).filter((a) => a.length > 0),
        data[i + 2].split(/\s/).filter((a) => a.length > 0),
        data[i + 3].split(/\s/).filter((a) => a.length > 0),
        data[i + 4].split(/\s/).filter((a) => a.length > 0),
    ]
    boards.push(b)
    markers.push(new Array(5).fill(false).map(() => new Array(5).fill(false)))
}

// part1();
part2();

function checkwinningBoard(board, position) {
    //check rows
    for (let i = 0; i < 5; i++) {
        if (position[i][0] &&
            position[i][1] &&
            position[i][2] &&
            position[i][3] &&
            position[i][4]) {
            return true
        }
    }
    //check cols
    for (let i = 0; i < 5; i++) {
        if (position[0][i] &&
            position[1][i] &&
            position[2][i] &&
            position[3][i] &&
            position[4][i]) {
            return true
        }
    }
    return false;
}

function sumBoard(board, position) {
    let sum = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (position[i][j] === false) {
                sum += parseInt(board[i][j])
            }
        }
    }
    return sum;
}

function part1() {
    let winningBoard, winningPlace;
    let oldNum;
    for (let num of numbers) {
        let found = false;
        for (let i = 0; i < boards.length; i++) {
            for (let j = 0; j < boards[i].length; j++) {
                for (let k = 0; k < boards[i][j].length; k++) {
                    if (boards[i][j][k] == num) {
                        markers[i][j][k] = true;
                    }
                }
            }
            for (let i = 0; i < boards.length; i++) {
                let iswinningBoard = checkwinningBoard(boards[i], markers[i])
                if (iswinningBoard) {
                    winningBoard = boards[i];
                    winningPlace = markers[i];
                    oldNum = parseInt(num);
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        if (found) {
            break;
        }
    }
    let sum = sumBoard(winningBoard, winningPlace)

    console.log(sum * oldNum)
}

function part2() {
    let winningBoardHash = {}
    let winningBoardCount = 0;
    for (let num of numbers) {
        for (let i = 0; i < boards.length; i++) {
            for (let j = 0; j < boards[i].length; j++) {
                for (let k = 0; k < boards[i][j].length; k++) {
                    if (boards[i][j][k] == num) {
                        markers[i][j][k] = true;
                    }
                }
            }
            for (let i = 0; i < boards.length; i++) {
                let iswinningBoard = checkwinningBoard(boards[i], markers[i])
                if (iswinningBoard && !winningBoardHash[i]) {
                    winningBoardHash[i] = true;
                    winningBoardCount += 1;
                }
                if (iswinningBoard && winningBoardCount == boards.length) {
                    let sum = sumBoard(boards[i], markers[i]);
                    console.log(sum * parseInt(num))
                    process.exit()
                }
            }
        }
    }
}