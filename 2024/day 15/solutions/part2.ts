export function part2(input: string): string {
  const [rawMap, rawMoves] = input.trim().split("\r\n\r\n");
  const originalRows = rawMap.split("\r\n");
  const moves = rawMoves.replace(/\r\n/g, "").split("");

  let transformed: string[][] = [];
  let robotX = 0;
  let robotY = 0;

  for (let y = 0; y < originalRows.length; y++) {
    const row = originalRows[y];
    let newRow: string[] = [];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === "#") {
        newRow.push("#", "#");
      } else if (ch === "O") {
        newRow.push("O", "O");
      } else if (ch === ".") {
        newRow.push(".", ".");
      } else if (ch === "@") {
        newRow.push("@", ".");
        robotX = x * 2;
        robotY = y;
      }
    }
    transformed.push(newRow);
  }

  const height = transformed.length;
  const width = transformed[0].length;

  interface Obj {
    x: number;
    y: number;
    w: number;
    h: number;
    type: "wall" | "box" | "robot";
    id?: number; // for boxes
  }

  const walls: Obj[] = [];
  const boxes: Obj[] = [];
  let boxId = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (transformed[y][x] === "#" && transformed[y][x + 1] === "#") {
        walls.push({ x, y, w: 2, h: 1, type: "wall" });
        x++; // skip next since processed
      } else if (transformed[y][x] === "O" && transformed[y][x + 1] === "O") {
        boxes.push({ x, y, w: 2, h: 1, type: "box", id: boxId++ });
        x++; // skip next cell
      }
    }
  }

  let robot: Obj = { x: robotX, y: robotY, w: 1, h: 1, type: "robot" };

  function collide(a: Obj, b: Obj): boolean {
    return !(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y);
  }

  function blockedByWall(obj: Obj): boolean {
    for (const w of walls) {
      if (collide(obj, w)) return true;
    }
    return false;
  }

  function findBoxesAt(obj: Obj): Obj[] {
    return boxes.filter((b) => collide(obj, b));
  }

  const dirs: { [k: string]: [number, number] } = {
    "^": [0, -1],
    v: [0, 1],
    "<": [-1, 0],
    ">": [1, 0],
  };

  for (const m of moves) {
    const [dx, dy] = dirs[m];
    const newRobot: Obj = { x: robot.x + dx, y: robot.y + dy, w: 1, h: 1, type: "robot" };

    // Check wall collision
    if (blockedByWall(newRobot)) {
      continue;
    }

    // Check box collision
    let initialBoxes = findBoxesAt(newRobot);
    if (initialBoxes.length === 0) {
      // Move robot freely
      robot = newRobot;
      continue;
    }

    // Need to push boxes
    // We'll do a breadth-first push
    let toPush: Obj[] = initialBoxes;
    let pushPositions: { [id: number]: Obj } = {};
    let failed = false;
    let visited = new Set<number>();

    // We'll simulate pushing one step at a time
    const queue = [...toPush];
    for (const b of queue) {
      visited.add(b.id!);
    }

    while (queue.length > 0 && !failed) {
      const curr = queue.shift()!;
      const newBoxPos: Obj = { x: curr.x + dx, y: curr.y + dy, w: 2, h: 1, type: "box", id: curr.id };

      if (blockedByWall(newBoxPos)) {
        failed = true;
        break;
      }

      const collidingBoxes = boxes.filter((b) => b.id !== curr.id && collide(newBoxPos, b));
      for (const cb of collidingBoxes) {
        if (!visited.has(cb.id!)) {
          visited.add(cb.id!);
          queue.push(cb);
        }
      }

      pushPositions[curr.id!] = newBoxPos;
    }

    if (failed) {
      continue;
    }

    for (const id in pushPositions) {
      const boxId = parseInt(id, 10);
      const idx = boxes.findIndex((b) => b.id === boxId);
      boxes[idx] = pushPositions[boxId];
    }

    robot = newRobot;
  }

  let sum = 0;
  for (const b of boxes) {
    sum += b.y * 100 + b.x;
  }

  return sum.toString();
}
