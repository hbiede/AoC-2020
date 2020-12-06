import { inputAsStringArray } from '../utils/InputProcessor';

export const part1 = (input: string[]): number => {
  let currentGroup = '';
  let numberAnswered = 0;
  input.forEach((line: string) => {
    if (currentGroup.length > 0 && line.trim().length === 0) {
      numberAnswered += new Set(currentGroup.split('')).size;
      currentGroup = '';
    } else {
      currentGroup += line;
    }
  });
  return numberAnswered;
};

const countAllYeses = (group: string, groupSize: number): number => {
  const groupAnswers = group.split('');
  return [...new Set(groupAnswers)]
    .map(
      (question) => groupAnswers.filter((letter) => letter === question).length
    )
    .filter((questionCount) => questionCount === groupSize).length;
};

export const part2 = (input: string[]): number => {
  let currentGroup = '';
  let groupSize = 0;
  let numberAnswered = 0;
  input.forEach((line: string) => {
    if (currentGroup.length > 0 && line.trim().length === 0) {
      numberAnswered += countAllYeses(currentGroup, groupSize);
      currentGroup = '';
      groupSize = 0;
    } else {
      currentGroup += line;
      groupSize++;
    }
  });
  return numberAnswered;
};

const input = inputAsStringArray('src/day6/input.txt');
console.log(`Day 6:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
