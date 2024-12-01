export function part1(input: string): string {
  const lines = input.split("\r\n");
  const cities = new Set<string>();
  const distances = new Map<string, Map<string, number>>();

  for (const line of lines) {
    const [from, to, distance] = line.match(/(\w+) to (\w+) = (\d+)/)!.slice(1);

    cities.add(from);
    cities.add(to);

    if (!distances.has(from)) {
      distances.set(from, new Map());
    }

    if (!distances.has(to)) {
      distances.set(to, new Map());
    }

    distances.get(from)!.set(to, parseInt(distance));
    distances.get(to)!.set(from, parseInt(distance));
  }

  function permute(permutation: string[]): string[][] {
    const result: string[][] = [];
    const counters = Array(permutation.length).fill(0);
    result.push([...permutation]);

    let i = 1;

    while (i < permutation.length) {
      if (counters[i] < i) {
        const swapIndex = i % 2 === 0 ? 0 : counters[i];
        [permutation[i], permutation[swapIndex]] = [permutation[swapIndex], permutation[i]];
        result.push([...permutation]);
        counters[i]++;
        i = 1;
      } else {
        counters[i] = 0;
        i++;
      }
    }

    return result;
  }

  const routes = permute(Array.from(cities));

  let minDistance = Infinity;
  for (const route of routes) {
    let distance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      distance += distances.get(route[i])!.get(route[i + 1])!;
    }

    minDistance = Math.min(minDistance, distance);
  }

  return minDistance.toString();
}
