export function part1(input: string): string {
  type Direction = { x: number; y: number };
  type Keypad = { [key: string]: Direction };

  const BFS_DIRECTIONS: Keypad = {
    "^": { x: 0, y: -1 },
    ">": { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    "<": { x: -1, y: 0 },
  };

  const KEYPAD: Keypad = {
    7: { x: 0, y: 0 },
    8: { x: 1, y: 0 },
    9: { x: 2, y: 0 },
    4: { x: 0, y: 1 },
    5: { x: 1, y: 1 },
    6: { x: 2, y: 1 },
    1: { x: 0, y: 2 },
    2: { x: 1, y: 2 },
    3: { x: 2, y: 2 },
    X: { x: 0, y: 3 },
    0: { x: 1, y: 3 },
    A: { x: 2, y: 3 },
  };

  const DIRECTIONS: Keypad = {
    X: { x: 0, y: 0 },
    "^": { x: 1, y: 0 },
    A: { x: 2, y: 0 },
    "<": { x: 0, y: 1 },
    v: { x: 1, y: 1 },
    ">": { x: 2, y: 1 },
  };

  const getCommand = (input: Keypad, start: string, end: string): string[] => {
    const queue = [{ ...input[start], path: "" }];
    const distances: { [key: string]: number } = {};
    if (start === end) return ["A"];
    let allPaths: string[] = [];
    while (queue.length) {
      const current = queue.shift();
      if (!current) break;
      if (current.x === input[end].x && current.y === input[end].y) allPaths.push(current.path + "A");
      if (distances[`${current.x},${current.y}`] !== undefined && distances[`${current.x},${current.y}`] < current.path.length) continue;
      Object.entries(BFS_DIRECTIONS).forEach(([direction, vector]) => {
        const position = { x: current.x + vector.x, y: current.y + vector.y };
        if (input.X.x === position.x && input.X.y === position.y) return;
        const button = Object.values(input).find((button) => button.x === position.x && button.y === position.y);
        if (button) {
          const newPath = current.path + direction;
          if (distances[`${position.x},${position.y}`] === undefined || distances[`${position.x},${position.y}`] >= newPath.length) {
            queue.push({ ...position, path: newPath });
            distances[`${position.x},${position.y}`] = newPath.length;
          }
        }
      });
    }
    return allPaths.sort((a, b) => a.length - b.length);
  };

  const getKeyPresses = (input: Keypad, code: string, robot: number, memo: { [key: string]: number }): number => {
    const key = `${code},${robot}`;
    if (memo[key] !== undefined) return memo[key];
    let current = "A";
    let length = 0;
    for (const element of code) {
      const moves = getCommand(input, current, element);
      if (robot === 0) length += moves[0].length;
      else length += Math.min(...moves.map((move) => getKeyPresses(DIRECTIONS, move, robot - 1, memo)));
      current = element;
    }
    memo[key] = length;
    return length;
  };

  const calculateKeyPresses = (input: string, robot: number): number => {
    const keycodes = input.trim().split("\n");
    const memo: { [key: string]: number } = {};
    return keycodes.reduce((sum, code) => {
      const numerical = parseInt(
        code
          .split("")
          .filter((character) => character.match(/\d/))
          .join("")
      );
      return sum + numerical * getKeyPresses(KEYPAD, code, robot, memo);
    }, 0);
  };

  return calculateKeyPresses(input, 2).toString();
}
