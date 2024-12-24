type Graph = { [key: string]: string[] };

function parseInput(input: string): Graph {
  return input
    .trim()
    .split("\n")
    .reduce<Graph>((obj, line) => {
      const [left, right] = line.split("-");
      if (!obj[left]) obj[left] = [];
      if (!obj[right]) obj[right] = [];
      obj[left].push(right);
      obj[right].push(left);
      return obj;
    }, {});
}

function combination(array: string[], k: number): string[][] {
  const result: string[][] = [];
  const helper = (_array: string[], _k: number, _i: number, _current: string[]) => {
    if (_current.length === k) result.push(_current);
    if (_current.length === k || _i === _array.length) return;
    helper(_array, _k, _i + 1, [_array[_i], ..._current]);
    helper(_array, _k, _i + 1, [..._current]);
  };
  helper(array, k, 0, []);
  return result;
}

function findTripleSet(graph: Graph, path: string[]): string[][] {
  const current = path.at(-1) as string;
  if (path.length === 4) {
    return current === path[0] ? [path.slice(0, 3)] : [];
  }
  if (new Set(path).size !== path.length) return [];
  const allSets: string[][] = [];
  for (const neighbor of graph[current]) {
    path.push(neighbor);
    const sets = findTripleSet(graph, path);
    path.pop();
    if (sets.length > 0) allSets.push(...sets);
  }
  return allSets;
}

export function part2(input: string): string {
  const graph = parseInput(input);
  const MAX_LENGTH = Math.max(...Object.values(graph).map((array) => array.length));
  let biggest: string[] = [];
  for (const node of Object.keys(graph)) {
    const possibleCombinations = combination(graph[node].sort(), MAX_LENGTH - 1);
    for (const combo of possibleCombinations) {
      let common = new Set([node, ...graph[node]].sort());
      for (const element of combo) {
        common = new Set([...common].filter((x) => new Set([element, ...graph[element]].sort()).has(x)));
      }
      if (common.size === MAX_LENGTH) biggest = Array.from(common);
    }
  }
  return biggest.toString();
}
