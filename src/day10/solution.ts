import { inputAsNumArray } from '../utils/InputProcessor';

const getAdapterDifferences = (path: number[]) =>
  [0, ...path]
    .sort((a, b) => (a < b ? -1 : 1))
    .map((num, i, array) => (i === array.length - 1 ? 3 : array[i + 1] - num));

export const part1 = (input: number[]): number => {
  const { ones, threes } = getAdapterDifferences(input).reduce(
    (acc, diff) => ({
      ones: acc.ones + (diff === 1 ? 1 : 0),
      threes: acc.threes + (diff === 3 ? 1 : 0),
    }),
    { ones: 0, threes: 0 }
  );
  return ones * threes;
};

export const part2 = (input: number[]): number => {
  const sortedInput = input.sort((a, b) => (a < b ? -1 : 1));
  const max = sortedInput[sortedInput.length - 1];
  const fullPath = [0, ...sortedInput, max + 3];

  const joltLengths: Record<number, number> = {};
  fullPath.forEach((num) => (joltLengths[num] = num === 0 ? 1 : 0));
  fullPath.forEach((num) => {
    for (let i = 1; i < 4; i++) {
      // Sum the number of paths open to the (num + i)th element
      // This summation carries forward to the final element
      if (joltLengths.hasOwnProperty(num + i)) {
        joltLengths[num + i] += joltLengths[num];
      }
    }
  });
  return joltLengths[max + 3];
};

const input = inputAsNumArray('src/day10/input.txt');

console.log(`Day 10:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
