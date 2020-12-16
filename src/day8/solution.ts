import { inputAsStringArray } from '../utils/InputProcessor';

const processCommands = (
  input: string[],
  skipCount = -1
): { acc: number; finished: boolean } => {
  const visited: Record<number, boolean> = {};
  const commandRegex = /\w+\s\+?(\-?\d+)/;
  let acc = 0;
  let skippablesVisited = 0;
  for (let i = 0; i < input.length; i++) {
    if (visited[i]) {
      return {
        acc,
        finished: false,
      };
    }

    visited[i] = true;
    if (skippablesVisited === skipCount && input[i].startsWith('jmp')) {
      continue;
    } else if (
      input[i].startsWith('jmp') ||
      (skippablesVisited === skipCount && input[i].startsWith('nop'))
    ) {
      i += Number.parseInt((commandRegex.exec(input[i]) ?? ['1'])[1], 10) - 1;
    } else if (input[i].startsWith('acc')) {
      acc += Number.parseInt((commandRegex.exec(input[i]) ?? ['0'])[1], 10);
    }
    skippablesVisited++;
  }
  return {
    acc,
    finished: true,
  };
};

export const part1 = (input: string[]): number => processCommands(input).acc;

export const part2 = (input: string[]): number => {
  let skipCounter = 0;
  while (true) {
    const { acc, finished } = processCommands(input, skipCounter);
    if (finished) {
      return acc;
    } else {
      skipCounter++;
    }
  }
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day8/input.txt');
    console.log(
      `Day 8:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
