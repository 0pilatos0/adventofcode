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
  state?: boolean; // for flip-flops (on/off)
  memory?: Map<string, PulseType>; // for conjunctions (input states)
}

export function part1(input: unknown): string {
  const lines = (input as string).trim().split('\n');
  
  // Parse modules
  const modules = new Map<string, Module>();
  
  for (const line of lines) {
    if (!line.includes(' -> ')) continue; // Skip lines that don't match the expected format
    const [left, right] = line.split(' -> ');
    if (!right) continue; // Skip if right side is undefined
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
        state: false // initially off
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
  
  let lowPulses = 0;
  let highPulses = 0;
  
  // Simulate 1000 button presses
  for (let i = 0; i < 1000; i++) {
    const queue: Pulse[] = [];
    
    // Button press sends low pulse to broadcaster
    queue.push({ from: 'button', to: 'broadcaster', type: 'low' });
    lowPulses++;
    
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
      
      if (pulseToSend !== null) {
        for (const dest of module.destinations) {
          queue.push({ from: module.name, to: dest, type: pulseToSend });
          if (pulseToSend === 'low') {
            lowPulses++;
          } else {
            highPulses++;
          }
        }
      }
    }
  }
  
  return (lowPulses * highPulses).toString();
}
