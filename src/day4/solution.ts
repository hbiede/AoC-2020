import { inputAsStringArray } from '../utils/InputProcessor';

const isValidPassport = (passport: string, isStrict = false): boolean => {
  if (passport.trim().length === 0) return false;

  if (isStrict) {
    const birth = /\sbyr:(\d{4,})\s/;
    let year = Number.parseInt((birth.exec(passport) ?? ['0', '0'])[1], 10);
    if (year > 2002 || year < 1920) {
      return false;
    }

    const issue = /\siyr:(\d{4,})\s/;
    year = Number.parseInt((issue.exec(passport) ?? ['0', '0'])[1], 10);
    if (year > 2020 || year < 2010) {
      return false;
    }

    const expire = /\seyr:(\d{4,})\s/;
    year = Number.parseInt((expire.exec(passport) ?? ['0', '0'])[1], 10);
    if (year > 2030 || year < 2020) {
      return false;
    }

    const height = /\shgt:(\d+)(cm|in)\s/;
    const regexResult = height.exec(passport) ?? ['0', '0', 'cm'];
    const heightValue = Number.parseInt(regexResult[1], 10);
    if (
      (regexResult[2] == 'cm' && (heightValue < 150 || heightValue > 193)) ||
      (regexResult[2] == 'in' && (heightValue < 59 || heightValue > 76))
    ) {
      return false;
    }

    const hair = /\shcl:#[\da-f]{6,}\s/;
    if (!hair.test(passport)) {
      return false;
    }

    const eyes = /\secl:(?:amb|blu|brn|gry|grn|hzl|oth)\s/;
    if (!eyes.test(passport)) {
      return false;
    }

    const passportID = /\spid:\d{9,9}\s/;
    return passportID.test(passport);
  }
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    .map((field) => new RegExp(`\\s${field}:.`))
    .every((field) => field.test(passport));
};

const validCounter = (input: string[], isStrict: boolean): number => {
  let currentPassport = '';
  let numberValid = 0;
  input.forEach((line: string) => {
    if (currentPassport.length > 0 && line.trim().length === 0) {
      numberValid += isValidPassport(currentPassport, isStrict) ? 1 : 0;
      currentPassport = '';
    } else {
      currentPassport += ` ${line} `;
    }
  });
  return numberValid + (isValidPassport(currentPassport, isStrict) ? 1 : 0);
};

export const part1 = (input: string[]): number => validCounter(input, false);

export const part2 = (input: string[]): number => validCounter(input, true);

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day4/input.txt');
    console.log(
      `Day 4:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
