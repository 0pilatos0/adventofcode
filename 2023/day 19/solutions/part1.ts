interface Part {
  x: number;
  m: number;
  a: number;
  s: number;
}

interface Rule {
  condition?: {
    property: keyof Part;
    operator: '<' | '>';
    value: number;
  };
  destination: string;
}

interface Workflow {
  name: string;
  rules: Rule[];
}

export function part1(input: unknown): string {
  const lines = (input as string).trim().split('\n');
  
  const emptyLineIndex = lines.findIndex(line => line === '');
  const workflowLines = lines.slice(0, emptyLineIndex);
  const partLines = lines.slice(emptyLineIndex + 1);
  
  const workflows = parseWorkflows(workflowLines);
  const parts = parseParts(partLines);
  
  let totalAccepted = 0;
  
  for (const part of parts) {
    if (isPartAccepted(part, workflows)) {
      totalAccepted += part.x + part.m + part.a + part.s;
    }
  }
  
  return totalAccepted.toString();
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
              property: conditionMatch[1] as keyof Part,
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

function parseParts(lines: string[]): Part[] {
  const parts: Part[] = [];
  
  for (const line of lines) {
    const match = line.match(/^\{x=(\d+),m=(\d+),a=(\d+),s=(\d+)\}$/);
    if (match) {
      parts.push({
        x: parseInt(match[1]),
        m: parseInt(match[2]),
        a: parseInt(match[3]),
        s: parseInt(match[4])
      });
    }
  }
  
  return parts;
}

function isPartAccepted(part: Part, workflows: Map<string, Workflow>): boolean {
  let currentWorkflow = 'in';
  
  while (currentWorkflow !== 'A' && currentWorkflow !== 'R') {
    const workflow = workflows.get(currentWorkflow);
    if (!workflow) break;
    
    for (const rule of workflow.rules) {
      if (!rule.condition) {
        currentWorkflow = rule.destination;
        break;
      }
      
      const { property, operator, value } = rule.condition;
      const partValue = part[property];
      
      let conditionMet = false;
      if (operator === '<') {
        conditionMet = partValue < value;
      } else if (operator === '>') {
        conditionMet = partValue > value;
      }
      
      if (conditionMet) {
        currentWorkflow = rule.destination;
        break;
      }
    }
  }
  
  return currentWorkflow === 'A';
}
