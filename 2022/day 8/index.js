const fs = require('fs');

const inputFile = "input.txt";
// const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8').trim().split("\r\n").map(x => x.split(""));


/* PART 1 */
async function part1() {
    const grid = input.map(y => y.map(Number));
    let treesVisible = 0;

    // First, add the number of trees that are visible from the edge of the grid
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {

        }
    }

    // Then, check for each tree if it is visible from the north, east, south, or west
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            let current = input[y][x];
            if (y === 0 || 0 || x === 0 || y === grid.length - 1 || x === grid[0].length - 1) {
                treesVisible++;
            } else {

                
                let visibleFromNorth = 0;
                let visibleFromEast = 0;
                let visibleFromSouth = 0;
                let visibleFromWest = 0;

                // Check if the current tree is visible from the north
                for (let k = 1; k < input.length; k++) {
                    // travel left
                    if (x - k >= 0 && visibleFromWest === 0) {
                        input[y][x - k] >= current ? visibleFromWest++ : visibleFromWest;
                    }
                    // travel Right
                    if (x + k < input.length && visibleFromEast === 0) {
                        input[y][x + k] >= current ? visibleFromEast++ : visibleFromEast;
                    }
                    // travel Down
                    if (y + k < input[0].length && visibleFromSouth === 0) {
                        input[y + k][x] >= current ? visibleFromSouth++ : visibleFromSouth;
                    }

                    // travel Up
                    if (y - k >= 0 && visibleFromNorth === 0) {
                        input[y - k][x] >= current ? visibleFromNorth++ : visibleFromNorth;
                    }
                }

                if (visibleFromWest === 0 ||
                    visibleFromEast === 0 ||
                    visibleFromSouth === 0 ||
                    visibleFromNorth === 0) {
                    treesVisible++;
                }
            }

        }
    }

    return treesVisible;
}




/* PART 2 */
async function part2() {
    let highestSceneScore = 0;
    for (let row = 0; row < input[0].length; row++) {
      for (let col = 0; col < input.length; col++) {
        // if tree at edges, ignore
        let current = input[row][col];
        if (
          row === 0 ||
          col === 0 ||
          row === input.length - 1 ||
          col === input[0].length - 1
        ) {
          continue;
        }
  
        // for non edge case
        else {
          // initialization
          let current = input[row][col];
  
          let countLeft = 0,
            leftStopper = false;
          let countRight = 0,
            rightStopper = false;
          let countDown = 0,
            downStopper = false;
          let countUp = 0,
            upStopper = false;
  
          // setup k to travel all direction per node
          for (let k = 1; k < input.length; k++) {
            // travel left
            if (col - k >= 0 && !leftStopper) {
              if (input[row][col - k] < current) {
                countLeft++;
              } else {
                countLeft++;
                leftStopper = true;
              }
            }
            // travel Right
            if (col + k < input[0].length && !rightStopper) {
              if (input[row][col + k] < current) {
                countRight++;
              } else {
                countRight++;
                rightStopper = true;
              }
            }
            // travel Down
            if (row + k < input.length && !downStopper) {
              if (input[row + k][col] < current) {
                countDown++;
              } else {
                countDown++;
                downStopper = true;
              }
            }
  
            // travel Up
            if (row - k >= 0 && !upStopper) {
              if (input[row - k][col] < current) {
                countUp++;
              } else {
                countUp++;
                upStopper = true;
              }
            }
          }
          // end of  k loop
          let currentScenicScore = countLeft * countDown * countRight * countUp;
          highestSceneScore =
            currentScenicScore > highestSceneScore
              ? currentScenicScore
              : highestSceneScore;
        }
      }
    }
    return highestSceneScore;
}

async function main() {
    console.log("1️⃣ Part 1: " + await part1());
    console.log("2️⃣ Part 2: " + await part2());
}



main();