import * as fs from 'fs';

const part1 = (input: string): number => {
  return -1;
};

const part2 = (input: string): number => {
  return -1;
};

fs.readFile('src/day!DAY!/input.txt', 'utf8', (error, input) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Part 1:  ${part1(input)}\nPart 2:  ${part2(input)}`);
  }
});
