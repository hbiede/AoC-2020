import { inputAsStringArray } from '../utils/InputProcessor';

const parenthesizedExpression = /\(([\d\s*+]+?)\)/;
const additionExpression = /(?<!\d)(\d+\s\+\s\d+)/;
const digitMatcher = /^[0-9]+$/;
const isExpressionTester = /[\s+*]/;
const parseExpression = (input: string, isAdditionFirst = false): number => {
  if (input.length === 0) return 0;
  if (digitMatcher.test(input)) return Number.parseInt(input, 10);

  let currentExpression = input;
  while (currentExpression.includes('(')) {
    const parenthetical = (parenthesizedExpression.exec(currentExpression) ?? [
      '',
    ])[1];
    currentExpression = currentExpression.replace(
      `(${parenthetical})`,
      `${parseExpression(parenthetical, isAdditionFirst)}`
    );
  }
  if (isAdditionFirst) {
    while (
      currentExpression.includes('+') &&
      currentExpression
        .split('+')
        .some((part) => isExpressionTester.test(part.trim()))
    ) {
      const addition = (additionExpression.exec(currentExpression) ?? [''])[0];
      currentExpression = currentExpression.replace(
        addition,
        `${parseExpression(addition, isAdditionFirst)}`
      );
    }
    if (digitMatcher.test(currentExpression))
      return Number.parseInt(currentExpression, 10);
  }

  let total = 0;
  let lastDigit: number | null = 0;
  let currentOp = '';
  for (let i = 0; i < currentExpression.length; i++) {
    const char = currentExpression[i];
    if (digitMatcher.test(char)) {
      lastDigit = 10 * (lastDigit ?? 0);
      lastDigit += Number.parseInt(char, 10);
      if (i === currentExpression.length - 1) {
        switch (currentOp) {
          case '+':
            total += lastDigit;
            break;
          default:
            total *= lastDigit;
        }
      }
    } else if (char === '+' || char === '*') {
      currentOp = char;
    } else if (total === 0 && char === ' ' && currentOp === '') {
      total = lastDigit ?? 0;
      lastDigit = null;
    } else if (char === ' ' && lastDigit !== null && currentOp === '+') {
      total += lastDigit;
      lastDigit = null;
    } else if (char === ' ' && lastDigit !== null && currentOp === '*') {
      total *= lastDigit;
      lastDigit = null;
    }
  }
  return total;
};

export const part1 = (input: string[]): number =>
  input.reduce((acc, line) => acc + parseExpression(line), 0);

export const part2 = (input: string[]): number =>
  input.reduce((acc, line) => acc + parseExpression(line, true), 0);

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day18/input.txt');
    console.log(
      `Day 18:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
