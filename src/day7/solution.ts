import { inputAsStringArray } from '../utils/InputProcessor';

type BagContents = { bag: string; quantity: number };

const generateBagContents = (
  input: string[]
): Record<string, BagContents[]> => {
  const bags: Record<string, BagContents[]> = {};
  const regex = /(\d+) ([\w\s]+?) bags?/;
  input.forEach((bag) => {
    if (bag.includes(' bags contain ')) {
      const [bagName, internals] = bag.split(' bags contain ');
      bags[bagName] = internals
        .split(', ')
        .map((content) => {
          const result = regex.exec(content);
          if (result) {
            return {
              bag: result[2],
              quantity: Number.parseInt(result[1], 10),
            };
          }
          return {
            bag: '',
            quantity: -1,
          };
        })
        .filter((content) => content.quantity !== -1);
    }
  });
  return bags;
};

const canHoldBag = (
  container: string,
  bagRules: Record<string, BagContents[]>,
  memo: Record<string, boolean> = {},
  desiredContainer = 'shiny gold'
): { result: boolean; memo: Record<string, boolean> } => {
  const canHoldDesired = (bagType: string): boolean => {
    if (memo[bagType] == undefined) {
      memo[bagType] =
        !!bagRules[bagType] &&
        bagRules[bagType].some(
          (rule) => rule.bag === desiredContainer || canHoldDesired(rule.bag)
        );
    }
    return memo[bagType];
  };
  return {
    result: canHoldDesired(container),
    memo,
  };
};

export const part1 = (input: string[]): number => {
  const bagRules = generateBagContents(input);
  let memo: Record<string, boolean> = {};
  return Object.keys(bagRules).filter((rule) => {
    const result = canHoldBag(rule, bagRules, memo);
    memo = result.memo;
    return result.result;
  }).length;
};

export const part2 = (input: string[]): number => {
  const bagRules = generateBagContents(input);

  const memo: Record<string, number> = {};
  const quantityInside = (bag: string): number => {
    if (memo[bag] == undefined) {
      memo[bag] = bagRules[bag].reduce(
        (acc, bagName) =>
          acc + bagName.quantity * (1 + quantityInside(bagName.bag)),
        0
      );
    }
    return memo[bag];
  };
  return quantityInside('shiny gold');
};

const input = inputAsStringArray('src/day7/input.txt');
console.log(`Day 7:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
