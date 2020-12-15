import { inputAsNumArray } from '../utils/InputProcessor';

const findMemAt = (input: number[], at: number): number => {
  let lastNum = input[input.length - 1];
  const lastSpoken = new Array(at);
  input.forEach((val, i) => (lastSpoken[val] = i + 1));

  for (let i = input.length; i < at; i++) {
    const newNum = lastSpoken[lastNum] ? i - lastSpoken[lastNum] : 0;
    lastSpoken[lastNum] = i;
    lastNum = newNum;
  }
  return lastNum;
};

export const part1 = (input: number[]): number => findMemAt(input, 2020);

export const part2 = (input: number[]): number => findMemAt(input, 30000000);

const input = inputAsNumArray('src/day15/input.txt', ',');
console.log(`Day 15:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
