type PulseType = 'low' | 'high';

interface Pulse {
  from: string;
  to: string;
  type: PulseType;
}

interface Module {
  name: string;
  type: 'broadcaster' | 'flip-flop' | 'conjunction';
  destinations: string[];
  state?: boolean;
  memory?: Map<string, PulseType>;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export function part2(input: unknown): string {
  const lines = (input as string).trim().split('\n');
  
  // Parse modules
  const modules = new Map<string, Module>();
  
  for (const line of lines) {
    if (!line.includes(' -> ')) continue;
    const [left, right] = line.split(' -> ');
    if (!right) continue;
    const destinations = right.split(', ');
    
    if (left === 'broadcaster') {
      modules.set('broadcaster', {
        name: 'broadcaster',
        type: 'broadcaster',
        destinations
      });
    } else if (left.startsWith('%')) {
      const name = left.slice(1);
      modules.set(name, {
        name,
        type: 'flip-flop',
        destinations,
        state: false
      });
    } else if (left.startsWith('&')) {
      const name = left.slice(1);
      modules.set(name, {
        name,
        type: 'conjunction',
        destinations,
        memory: new Map()
      });
    }
  }
  
  // Initialize conjunction modules with their inputs
  for (const [moduleName, module] of modules) {
    for (const dest of module.destinations) {
      const destModule = modules.get(dest);
      if (destModule?.type === 'conjunction') {
        destModule.memory!.set(moduleName, 'low');
      }
    }
  }
  
  // Find the modules that feed into rx (through lb)
  const rxFeeder = Array.from(modules.values()).find(m => m.destinations.includes('rx'));
  if (!rxFeeder) return "0";
  
  const feeders = Array.from(modules.values())
    .filter(m => m.destinations.includes(rxFeeder.name))
    .map(m => m.name);
  
  const cycleLengths = new Map<string, number>();
  let buttonPresses = 0;
  
  while (cycleLengths.size < feeders.length) {
    buttonPresses++;
    const queue: Pulse[] = [];
    
    queue.push({ from: 'button', to: 'broadcaster', type: 'low' });
    
    while (queue.length > 0) {
      const pulse = queue.shift()!;
      const module = modules.get(pulse.to);
      
      if (!module) continue;
      
      let pulseToSend: PulseType | null = null;
      
      if (module.type === 'broadcaster') {
        pulseToSend = pulse.type;
      } else if (module.type === 'flip-flop') {
        if (pulse.type === 'low') {
          module.state = !module.state;
          pulseToSend = module.state ? 'high' : 'low';
        }
      } else if (module.type === 'conjunction') {
        module.memory!.set(pulse.from, pulse.type);
        const allHigh = Array.from(module.memory!.values()).every(v => v === 'high');
        pulseToSend = allHigh ? 'low' : 'high';
      }
      
      // Check if this module is one of the feeders and sent a high pulse
      if (feeders.includes(pulse.to) && pulseToSend === 'high' && !cycleLengths.has(pulse.to)) {
        cycleLengths.set(pulse.to, buttonPresses);
      }
      
      if (pulseToSend !== null) {
        for (const dest of module.destinations) {
          queue.push({ from: module.name, to: dest, type: pulseToSend });
        }
      }
    }
  }
  
  // Calculate LCM of all cycle lengths
  let result = 1;
  for (const length of cycleLengths.values()) {
    result = lcm(result, length);
  }
  
  return result.toString();
}
