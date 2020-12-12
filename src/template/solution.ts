import { inputAsStringArray } from '../utils/InputProcessor';

export const part1 = (input: string[]): number => {
  return input.length;
};

export const part2 = (input: string[]): number => {
  return input.length;
};

const input = inputAsStringArray('src/day!DAY!/input.txt');
console.log(
  `Day !DAY!:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
);
