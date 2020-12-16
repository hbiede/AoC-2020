import { inputAsStringArray } from '../utils/InputProcessor';

type Rule = {
  name: string;
  firstLow: number;
  firstHigh: number;
  secondLow: number;
  secondHigh: number;
  index: number;
  indices: number[];
};

const ruleRegex = /([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)/;
const genRules = (rulesText: string[], fieldLength = 0): Rule[] => {
  const defaultIndices: number[] = [];
  for (let i = 0; i < fieldLength; i++) {
    defaultIndices.push(i);
  }
  return rulesText
    .map((rule) => {
      const splitRule = ruleRegex.exec(rule);
      if (splitRule && splitRule.length === 6) {
        return {
          name: splitRule[1],
          firstLow: Number.parseInt(splitRule[2], 10),
          firstHigh: Number.parseInt(splitRule[3], 10),
          secondLow: Number.parseInt(splitRule[4], 10),
          secondHigh: Number.parseInt(splitRule[5], 10),
          index: -1,
          indices: [...defaultIndices],
        };
      }
      return {
        name: 'invalid',
        firstLow: -1,
        firstHigh: -1,
        secondLow: -1,
        secondHigh: -1,
        index: -1,
        indices: [],
      };
    })
    .filter((rule) => rule.firstHigh !== -1);
};

const getInvalidFieldIndex = (
  ticket: string,
  rules: Rule[]
): { index: number; val: number } => {
  const fields = ticket.split(',').map((field) => Number.parseInt(field, 10));
  for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
    const field = fields[fieldIndex];
    if (
      !rules.some(
        ({ firstLow, firstHigh, secondLow, secondHigh }) =>
          (firstLow <= field && field <= firstHigh) ||
          (secondLow <= field && field <= secondHigh)
      )
    ) {
      return { index: fieldIndex, val: field };
    }
  }
  return { index: -1, val: -1 };
};

const getInvalidField = (ticket: string, rules: Rule[]): number =>
  getInvalidFieldIndex(ticket, rules).val;

export const part1 = (input: string[]): number => {
  const startOfYourTicket = input.findIndex((line) =>
    line.startsWith('your ticket')
  );
  const rulesSection = input.slice(0, startOfYourTicket - 1);
  const rules = genRules(rulesSection);

  return input
    .slice(startOfYourTicket + 4)
    .map((ticket) => getInvalidField(ticket, rules))
    .reduce((acc, field) => acc + (field === -1 ? 0 : field), 0);
};

export const part2 = (input: string[]): number => {
  // unknown
  return input.length;
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day16/input.txt');
    console.log(
      `Day 16:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
