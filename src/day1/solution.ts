import { inputAsNumArray } from '../utils/InputProcessor';

export const part1 = (input: number[]): number => {
  const record1 =
    input.find(
      (record1) =>
        record1 < 2020 &&
        input.find((record2) => record1 + record2 === 2020) != undefined
    ) ?? -1;
  return record1 * (2020 - record1);
};

export const part2 = (input: number[]): number => {
  let i = -1,
    j = -1,
    k = -1;
  input.forEach((record1, i1) => {
    if (record1 <= 2020) {
      input.forEach((record2, i2) => {
        if (record1 + record2 <= 2020) {
          input.forEach((record3, i3) => {
            if (record1 + record2 + record3 === 2020) {
              i = i1;
              j = i2;
              k = i3;
            }
          });
        }
      });
    }
  });
  return i === -1 ? -1 : input[i] * input[j] * input[k];
};

const input = inputAsNumArray('src/day1/input.txt', '\n');
console.log(`Day 1:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
