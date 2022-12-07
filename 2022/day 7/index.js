const fs = require('fs');

const inputFile = "input.txt";
// const inputFile = "testInput.txt";
const input = fs.readFileSync(inputFile, 'utf8').replace(/\r/g, "").trim().split("\n")


/* PART 1 */
async function part2() {
    const maxSize = 100000

    const tree = createTree(input)

    let sumOfFolderSize = 0

    getSize(tree, (name, size) => {
        if (size < maxSize) {
            sumOfFolderSize += size
        }
    })

    return sumOfFolderSize
}

async function part1() {
    const maxSize = 100000

    const tree = createTree(input)

    let sumOfFolderSize = 0

    getSize(tree, (name, size) => {
        if (size < maxSize) {
            sumOfFolderSize += size
        }
    })

    return sumOfFolderSize
}



/* PART 2 */
async function part2() {
    const totalSpace = 70000000
    const neededSpace = 30000000
    const tree = createTree(input)

    const usedSpace = getSize(tree)
    const availableSpace = totalSpace - usedSpace
    if (availableSpace > neededSpace) {
        throw new Error("There is already enough space available")
    }
    const minimumFolderSize = neededSpace - availableSpace
    const goodCandidates = []

    getSize(tree, (name, size) => {
        if (size >= minimumFolderSize) {
            goodCandidates.push({
                name,
                size
            })
        }
    })

    goodCandidates.sort((a, b) => a.size - b.size)

    return goodCandidates[0].size

}


async function main() {
    console.log("1️⃣ Part 1: " + await part1());
    console.log("2️⃣ Part 2: " + await part2());
}


const createTree = (input) => {
    const tree = {
        name: "/",
        isDirectory: true,
        children: [],
    }

    let currentNode = tree
    let currentCommand = null

    for (const line of input) {
        if (line[0] === "$") {
            const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line)
            currentCommand = match.groups.command
            if (currentCommand === "cd") {
                const target = match.groups.arg
                switch (target) {
                    case "/":
                        currentNode = tree
                        break
                    case "..":
                        currentNode = currentNode.parent
                        break
                    default:
                        currentNode = currentNode.children.find(
                            (folder) => folder.isDirectory && folder.name === target
                        )
                }
            }
        } else {
            if (currentCommand === "ls") {
                const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line)
                if (fileMatch) {
                    const node = {
                        name: fileMatch.groups.name,
                        size: parseInt(fileMatch.groups.size),
                        isDirectory: false,
                        parent: currentNode,
                    }
                    currentNode.children.push(node)
                }
                const dirMatch = /^dir (?<name>.+)$/.exec(line)
                if (dirMatch) {
                    const node = {
                        name: dirMatch.groups.name,
                        isDirectory: true,
                        children: [],
                        parent: currentNode,
                    }
                    currentNode.children.push(node)
                }
            } else {
                throw new Error("unknown state")
            }
        }
    }

    return tree
}

const printTree = (node, depth = 0) => {
    console.log(
        `${" ".repeat(depth * 2)}- ${node.name} (${
        node.isDirectory ? "dir" : `file, size=${node.size}`
      })`
    )
    if (node.isDirectory) {
        for (const child of node.children) {
            printTree(child, depth + 1)
        }
    }
}
const getSize = (node, directoryCallback = () => {}) => {
    if (!node.isDirectory) {
        return node.size
    }
    const directorySize = node.children
        .map((child) => getSize(child, directoryCallback))
        .reduce((a, b) => a + b, 0);
    directoryCallback(node.name, directorySize)

    return directorySize
}



main();