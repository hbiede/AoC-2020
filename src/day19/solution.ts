import { inputAsStringArray } from '../utils/InputProcessor';

type Rule = {
  regex?: RegExp;
  text: string;
};

type RuleSet = Record<number, Rule>;

const numberMatcher = /[0-9]+/;
const stringReplacer = /\s+/g;
const buildFinalRule = (
  input: string[],
  replacements: Record<number, string> = {}
) => {
  const ruleSet: RuleSet = {};

  const readyQueue: number[] = [];
  input.forEach((line) => {
    const [ruleNumText, rule] = line.split(': ');
    const ruleNum = Number.parseInt(ruleNumText, 10);
    if (rule.startsWith('"')) {
      const text = rule.slice(1, rule.length - 1);
      ruleSet[ruleNum] = {
        text,
        regex: new RegExp(text.replaceAll(stringReplacer, '')),
      };
      readyQueue.push(ruleNum);
    } else {
      const text = replacements[ruleNum] ?? rule;
      ruleSet[ruleNum] = { text: ` ${text} ` };
    }
  });
  while (readyQueue.length > 0) {
    const next = readyQueue.pop() ?? 0;
    if (next !== 0) {
      // 0 === Last rule, and thus cannot be cascaded
      const { text: nextText } = ruleSet[next];
      const nextMatcher = new RegExp(`(?<=\\s)${next}(?=\\s)`, 'g');
      Object.entries(ruleSet).forEach(([key, { text }]: [string, Rule]) => {
        if (nextMatcher.test(text)) {
          const numKey = Number.parseInt(key, 10);
          ruleSet[numKey].text = text.replaceAll(
            nextMatcher,
            ` (?:${nextText}) `
          );
          if (!numberMatcher.test(ruleSet[numKey].text)) {
            // String is done
            let regex = ruleSet[numKey].text.replaceAll(stringReplacer, '');
            if (numKey === 0) {
              regex = `^${regex}$`;
            }
            ruleSet[numKey].regex = new RegExp(regex);
            readyQueue.push(numKey);
          }
        }
      });
    }
  }
  return ruleSet[0].regex ?? /failed/;
};
export const part1 = (input: string[]): number => {
  const ruleSplit = input.findIndex((line) => line.trim().length === 0);
  const finalRule = buildFinalRule(input.slice(0, ruleSplit));
  return finalRule
    ? input.slice(ruleSplit + 1).filter((line) => finalRule.test(line)).length
    : -1;
};

export const part2 = (input: string[]): number => {
  const ruleSplit = input.findIndex((line) => line.trim().length === 0);
  const finalRule = buildFinalRule(input.slice(0, ruleSplit), {
    8: ' (?: 42 )+ ',
    // Regex isn't really built for internal recursion, so here's hoping this is fine...
    11: ' 42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31 ',
  });
  return finalRule
    ? input.slice(ruleSplit + 1).filter((line) => finalRule.test(line)).length
    : -1;
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day19/input.txt');
    console.log(
      `Day 19:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
