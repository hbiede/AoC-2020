import { inputAsStringArray } from '../utils/InputProcessor';

export type Field = {
  index: number;
  value: number;
  name: string;
};

export type UncertainField = Omit<Field, 'name'> & {
  possibleFieldNames: string[];
  name?: string;
};

type Range = {
  low: number;
  high: number;
};

type Rule = {
  name: string;
  ranges: Range[];
};

// Parser
const genRules = (rulesText: string[]): Rule[] =>
  rulesText
    .map((rule) => {
      const [name, rangesText] = rule.split(': ');
      return {
        name,
        ranges: rangesText.split(' or ').map((rangeText) => {
          const [low, high] = rangeText
            .split('-')
            .map((val) => Number.parseInt(val, 10));
          return {
            low,
            high,
          };
        }),
      };
    })
    .filter((rule) => rule.ranges.length > 0);

const getInvalidFieldIndex = (
  ticket: number[],
  rules: Rule[]
): { index: number; val: number } => {
  for (let fieldIndex = 0; fieldIndex < ticket.length; fieldIndex++) {
    const field = ticket[fieldIndex];
    if (
      !rules.some((rule) =>
        rule.ranges.some(({ low, high }) => low <= field && field <= high)
      )
    ) {
      return { index: fieldIndex, val: field };
    }
  }
  return { index: -1, val: -1 };
};

const getInvalidField = (ticket: number[], rules: Rule[]): number =>
  getInvalidFieldIndex(ticket, rules).val;

const findFieldAssociations = (
  ticket: number[],
  otherTickets: number[][],
  rules: Rule[]
): Field[] => {
  const myFields = ticket.map((value, index) => {
    const otherTicketsFields = otherTickets.map((ticket) => ticket[index]);
    const possibleFieldNames = rules
      .filter(({ ranges }) =>
        otherTicketsFields.every((field) =>
          ranges.some((range) => range.low <= field && field <= range.high)
        )
      )
      .map(({ name }) => name);
    return { index, value, possibleFieldNames } as UncertainField;
  });

  const certainFields = new Set<string>();
  while (myFields.some((field) => field.possibleFieldNames.length)) {
    for (const myField of myFields.filter(
      (field) => field.possibleFieldNames.length === 1
    )) {
      myField.name = myField.possibleFieldNames[0];
      certainFields.add(myField.name);
    }

    // And take out from other field name considerations
    for (const field of myFields) {
      field.possibleFieldNames = field.possibleFieldNames.filter(
        (possibleFieldName) => !certainFields.has(possibleFieldName)
      );
    }
  }

  return myFields as Field[];
};

const getFields = (input: string[]): Field[] => {
  const startOfYourTicket = input.findIndex((line) =>
    line.startsWith('your ticket')
  );
  const yourTicket = input[startOfYourTicket + 1]
    .split(',')
    .map((field) => Number.parseInt(field, 10));
  const rules = genRules(input.slice(0, startOfYourTicket - 1));
  const validTickets = input
    .slice(startOfYourTicket + 4)
    .map((ticket) =>
      ticket.split(',').map((field) => Number.parseInt(field, 10))
    )
    .filter((ticket) => getInvalidField(ticket, rules) === -1);

  return findFieldAssociations(yourTicket, validTickets, rules);
};

export const part1 = (input: string[]): number => {
  const startOfYourTicket = input.findIndex((line) =>
    line.startsWith('your ticket')
  );
  const rules = genRules(input.slice(0, startOfYourTicket - 1));

  return input
    .slice(startOfYourTicket + 4)
    .map((ticket) =>
      getInvalidField(
        ticket.split(',').map((field) => Number.parseInt(field, 10)),
        rules
      )
    )
    .reduce((acc, field) => acc + (field === -1 ? 0 : field), 0);
};

export const part2 = (input: string[], regex = /^depart/): number =>
  getFields(input)
    .filter(({ name }) => regex.test(name))
    .reduce((acc, { value }) => acc * value, 1);

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day16/input.txt');
    console.log(
      `Day 16:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
