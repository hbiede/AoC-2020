import { inputAsNumArray } from '../utils/InputProcessor';

const findMemAt = (input: number[], at: number): number => {
  let lastNum = input[input.length - 1];
  // Pre-allocated arrays are faster than maps at scale
  const lastSeen = new Array(at);
  input.forEach((val, i) => (lastSeen[val] = i + 1));

  for (let i = input.length; i < at; i++) {
    const newNum = lastSeen[lastNum] ? i - lastSeen[lastNum] : 0;
    lastSeen[lastNum] = i;
    lastNum = newNum;
  }
  return lastNum;
};

export const part1 = (input: number[]): number => findMemAt(input, 2020);

export const part2 = (input: number[]): number => findMemAt(input, 30000000);

if (require.main === module) {
  (() => {
    const input = inputAsNumArray('src/day15/input.txt', ',');
    console.log(
      `Day 15:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
