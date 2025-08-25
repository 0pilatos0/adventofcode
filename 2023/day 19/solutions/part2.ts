interface Range {
  min: number;
  max: number;
}

interface PartRange {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
}

interface Rule {
  condition?: {
    property: keyof PartRange;
    operator: '<' | '>';
    value: number;
  };
  destination: string;
}

interface Workflow {
  name: string;
  rules: Rule[];
}

export function part2(input: unknown): string {
  const lines = (input as string).trim().split('\n');
  
  const emptyLineIndex = lines.findIndex(line => line === '');
  const workflowLines = lines.slice(0, emptyLineIndex);
  
  const workflows = parseWorkflows(workflowLines);
  
  const initialRange: PartRange = {
    x: { min: 1, max: 4000 },
    m: { min: 1, max: 4000 },
    a: { min: 1, max: 4000 },
    s: { min: 1, max: 4000 }
  };
  
  const totalCombinations = countAcceptedCombinations(initialRange, 'in', workflows);
  
  return totalCombinations.toString();
}

function parseWorkflows(lines: string[]): Map<string, Workflow> {
  const workflows = new Map<string, Workflow>();
  
  for (const line of lines) {
    const match = line.match(/^(\w+)\{(.+)\}$/);
    if (!match) continue;
    
    const name = match[1];
    const rulesStr = match[2];
    const rules: Rule[] = [];
    
    const ruleParts = rulesStr.split(',');
    for (const rulePart of ruleParts) {
      if (rulePart.includes(':')) {
        const [conditionStr, destination] = rulePart.split(':');
        const conditionMatch = conditionStr.match(/^([xmas])([<>])(\d+)$/);
        if (conditionMatch) {
          rules.push({
            condition: {
              property: conditionMatch[1] as keyof PartRange,
              operator: conditionMatch[2] as '<' | '>',
              value: parseInt(conditionMatch[3])
            },
            destination
          });
        }
      } else {
        rules.push({ destination: rulePart });
      }
    }
    
    workflows.set(name, { name, rules });
  }
  
  return workflows;
}

function countAcceptedCombinations(
  range: PartRange, 
  workflowName: string, 
  workflows: Map<string, Workflow>
): number {
  if (workflowName === 'A') {
    return calculateCombinations(range);
  }
  
  if (workflowName === 'R') {
    return 0;
  }
  
  const workflow = workflows.get(workflowName);
  if (!workflow) return 0;
  
  let total = 0;
  let currentRange = { ...range };
  
  for (const rule of workflow.rules) {
    if (!rule.condition) {
      total += countAcceptedCombinations(currentRange, rule.destination, workflows);
      break;
    }
    
    const { property, operator, value } = rule.condition;
    const propertyRange = currentRange[property];
    
    let matchingRange: PartRange;
    let nonMatchingRange: PartRange;
    
    if (operator === '<') {
      if (propertyRange.max < value) {
        total += countAcceptedCombinations(currentRange, rule.destination, workflows);
        return total;
      } else if (propertyRange.min >= value) {
        continue;
      } else {
        matchingRange = {
          ...currentRange,
          [property]: { min: propertyRange.min, max: value - 1 }
        };
        nonMatchingRange = {
          ...currentRange,
          [property]: { min: value, max: propertyRange.max }
        };
      }
    } else {
      if (propertyRange.min > value) {
        total += countAcceptedCombinations(currentRange, rule.destination, workflows);
        return total;
      } else if (propertyRange.max <= value) {
        continue;
      } else {
        matchingRange = {
          ...currentRange,
          [property]: { min: value + 1, max: propertyRange.max }
        };
        nonMatchingRange = {
          ...currentRange,
          [property]: { min: propertyRange.min, max: value }
        };
      }
    }
    
    total += countAcceptedCombinations(matchingRange, rule.destination, workflows);
    currentRange = nonMatchingRange;
  }
  
  return total;
}

function calculateCombinations(range: PartRange): number {
  const xCount = Math.max(0, range.x.max - range.x.min + 1);
  const mCount = Math.max(0, range.m.max - range.m.min + 1);
  const aCount = Math.max(0, range.a.max - range.a.min + 1);
  const sCount = Math.max(0, range.s.max - range.s.min + 1);
  
  return xCount * mCount * aCount * sCount;
}
