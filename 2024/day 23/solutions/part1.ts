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

export function part1(input: string): string {
  const graph = parseInput(input);
  let allSets = new Set<string>();
  for (const node of Object.keys(graph)) {
    const sets = findTripleSet(graph, [node]).map((set) => set.sort().join(","));
    allSets = new Set([...allSets, ...sets]);
  }
  return Array.from(allSets)
    .reduce((sum, set) => (set.split(",").some((node) => node.startsWith("t")) ? sum + 1 : sum), 0)
    .toString();
}

const part2 = (input: string) => {
  const graph = parseInput(input);

  // the maximum connection size should be the one where all connections are connected to each other
  const MAX_LENGTH = Math.max(...Object.values(graph).map((array) => array.length));

  // find the biggest set intersection between all connections
  let biggest: string[] = [];
  Object.keys(graph).forEach((node) => {
    const possible = combination(graph[node].sort(), MAX_LENGTH - 1);
    for (let i = 0; i < possible.length; i++) {
      let common = new Set([node, ...graph[node]].sort());
      for (let j = 0; j < possible[i].length; j++) common = common.intersection(new Set([possible[i][j], ...graph[possible[i][j]]].sort()));
      if (common.size === MAX_LENGTH) biggest = Array.from(common);
    }
  });

  return biggest;
};
