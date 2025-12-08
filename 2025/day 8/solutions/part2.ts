export function part2(input: string): string {
  const junctionBoxes: { x: number; y: number; z: number }[] = input.split("\n").map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z };
  });

  const n = junctionBoxes.length;

  // Union-Find data structure for tracking circuits
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = Array(n).fill(0);

  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // path compression
    }
    return parent[x];
  }

  function union(x: number, y: number): boolean {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) {
      return false; // already in same circuit
    }

    // union by rank
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }

    return true; // connection made
  }

  // Calculate Euclidean distance between two junction boxes
  function distance(i: number, j: number): number {
    const a = junctionBoxes[i];
    const b = junctionBoxes[j];
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  // Generate all pairs with their distances
  const pairs: { i: number; j: number; dist: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs.push({ i, j, dist: distance(i, j) });
    }
  }

  // Sort pairs by distance (shortest first)
  pairs.sort((a, b) => a.dist - b.dist);

  // Count how many separate circuits we have
  function countCircuits(): number {
    const roots = new Set<number>();
    for (let i = 0; i < n; i++) {
      roots.add(find(i));
    }
    return roots.size;
  }

  // Keep connecting until all junction boxes are in one circuit
  let lastConnection: { i: number; j: number } | null = null;

  for (const pair of pairs) {
    // If we only have 1 circuit, we're done
    if (countCircuits() === 1) break;

    // Try to connect this pair
    if (union(pair.i, pair.j)) {
      // Connection was successful
      lastConnection = { i: pair.i, j: pair.j };
    }
  }

  // Multiply the X coordinates of the last two junction boxes connected
  if (lastConnection) {
    const result = junctionBoxes[lastConnection.i].x * junctionBoxes[lastConnection.j].x;
    return result.toString();
  }

  return "No connection needed";
}
