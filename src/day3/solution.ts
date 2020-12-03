import { inputAsText } from '../utils/InputProcessor';

const treeCount = (input: string[], right: number, down: number) => {
  let treeCount = 0;
  input.forEach((line, i) => {
    if (i % down === 0) {
      treeCount += line[((i / down) * right) % line.length] === '#' ? 1 : 0;
    }
  });
  return treeCount;
};
export const part1 = (input: string[]): number => {
  return treeCount(input, 3, 1);
};

export const part2 = (input: string[]): number => {
  return (
    treeCount(input, 1, 1) *
    treeCount(input, 3, 1) *
    treeCount(input, 5, 1) *
    treeCount(input, 7, 1) *
    treeCount(input, 1, 2)
  );
};

const input = inputAsText('src/day3/input.txt').split('\n');
console.log(`Part 1:  ${part1(input)}\nPart 2:  ${part2(input)}`);
