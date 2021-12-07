const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const whereMyCrabs = input.trim().split(',').map(Number);

const simpleFuel = (num, position) => Math.abs(num - position)
const complexFuelUsage = (num, position) => {
    let diff = Math.abs(num - position)
    let result = 0

    while (diff) {
        result += diff
        diff--
    }
    return result
}

function UberCalculation(positions, fuelCalculation = simpleFuel) {
    const min = Math.min(...positions)
    const max = Math.max(...positions)
    const simulations = []

    for (let i = min; i <= max; i++) {
        const fuels = positions.map(num => fuelCalculation(num, i))
        const fuel = fuels.reduce((acc, cur) => acc + cur, 0)
        simulations.push({
            fuel,
            position: i
        })
    }

    const result = simulations.reduce(
        (acc, cur) => {
            if (cur.fuel < acc.fuel) return cur
            return acc
        }, {
            fuel: Infinity,
        }
    )

    return result
}

console.log(UberCalculation(whereMyCrabs))
console.log(UberCalculation(whereMyCrabs, complexFuelUsage))