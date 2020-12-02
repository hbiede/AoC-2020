import { inputAsNumArray } from '../utils/InputProcessor';

export const part1 = (input: number[]): number => {
  const memo: Record<number, boolean> = {};
  let returnValue = -1;
  input.forEach((record) => {
    if (returnValue < 0 && record <= 2020) {
      memo[record] = true;
      const remaining = 2020 - record;
      if (memo[remaining]) {
        returnValue = remaining * record;
      }
      memo[remaining] = true;
    }
  });
  return returnValue;
};

export const part2 = (input: number[]): number => {
  const memo: Record<number, boolean> = {};
  let returnValue = -1;
  input.forEach((record1, i1) => {
    if (returnValue < 0 && record1 <= 2020) {
      memo[record1] = true;
      input.slice(i1 + 1).forEach((record2) => {
        const remaining = 2020 - (record1 + record2);
        if (remaining > 0) {
          if (memo[remaining] != undefined) {
            returnValue = remaining * record1 * record2;
          }
          memo[remaining] = true;
        }
      });
    }
  });
  return returnValue;
};

const input = inputAsNumArray('src/day1/input.txt', '\n');
console.log(`Day 1:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
