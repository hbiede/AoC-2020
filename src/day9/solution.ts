import { inputAsNumArray } from '../utils/InputProcessor';

export const part1 = (input: number[], preambleLength = 25): number => {
  for (let i = preambleLength; i < input.length; i++) {
    const latest = input.slice(i - preambleLength, i);
    if (!latest.some((number) => latest.includes(input[i] - number))) {
      return input[i];
    }
  }
  return -1;
};

export const part2 = (input: number[], firstInvalid: number): number => {
  for (let i = 2; i < input.length; i++) {
    const sumRangeIndex = input
      .map((_, j, array) =>
        array.slice(j, j + i).reduce((acc, val) => acc + val, 0)
      )
      .findIndex((sum) => sum === firstInvalid);
    if (sumRangeIndex !== -1) {
      const sumRange = input.slice(sumRangeIndex, sumRangeIndex + i);
      return Math.max(...sumRange) + Math.min(...sumRange);
    }
  }
  return -1;
};

if (require.main === module) {
  (() => {
    const input = inputAsNumArray('src/day9/input.txt');
    const firstInvalid = part1(input);
    console.log(
      `Day 9:\n  Part 1:  ${firstInvalid}\n  Part 2:  ${part2(
        input,
        firstInvalid
      )}`
    );
  })();
}
