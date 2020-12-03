import { inputAsText } from '../utils/InputProcessor';

type Count = {
  low: number;
  high: number;
};

export const validCounter = (
  input: string[],
  passwordIsValid: (count: Count, letter: string, password: string) => boolean
): number => {
  const regex = /(\d+)-(\d+)\s(\w):\s(.+)/;
  return input
    .filter((password) => password.length > 0)
    .map((password) => {
      const brokenString = regex.exec(password.trim());
      if (brokenString) {
        return passwordIsValid(
          {
            low: Number.parseInt(brokenString[1], 10),
            high: Number.parseInt(brokenString[2], 10),
          },
          brokenString[3],
          brokenString[4]
        );
      }
      return false;
    })
    .reduce((acc, truth) => acc + (truth ? 1 : 0), 0);
};

export const part1 = (input: string[]): number => {
  const passwordIsValid = (
    count: Count,
    letter: string,
    password: string
  ): boolean => {
    const letterCount =
      password.length - password.split(letter).join('').length;
    return letterCount >= count.low && letterCount <= count.high;
  };

  return validCounter(input, passwordIsValid);
};

export const part2 = (input: string[]): number => {
  const passwordIsValid = (
    count: Count,
    letter: string,
    password: string
  ): boolean =>
    (password[count.low - 1] === letter) !==
    (password[count.high - 1] === letter);

  return validCounter(input, passwordIsValid);
};

const input = inputAsText('src/day2/input.txt').split('\n');
console.log(`Day 2:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
