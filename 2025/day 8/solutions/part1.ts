export function part1(input: string): string {
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

  // Make connections (1000 for real input, 10 for test)
  const maxAttempts = n <= 20 ? 10 : 1000;
  let attempts = 0;

  for (const pair of pairs) {
    if (attempts >= maxAttempts) break;

    union(pair.i, pair.j); // Try to connect, even if already connected
    attempts++;
  }

  // Count circuit sizes
  const circuitSizes = new Map<number, number>();
  for (let i = 0; i < n; i++) {
    const root = find(i);
    circuitSizes.set(root, (circuitSizes.get(root) || 0) + 1);
  }

  // Get three largest circuits and multiply them
  const sizes = Array.from(circuitSizes.values()).sort((a, b) => b - a);
  const result = sizes[0] * sizes[1] * sizes[2];

  return result.toString();
}
