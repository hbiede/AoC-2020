import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day4/input.txt');

const inputExample = [
  // invalid
  'eyr:1972 cid:100\n',
  'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926\n',
  '\n',
  'iyr:2019\n',
  'hcl:#602927 eyr:1967 hgt:170cm\n',
  'ecl:grn pid:012533040 byr:1946\n',
  '\n',
  'hcl:dab227 iyr:2012\n',
  'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277\n',
  '\n',
  'hgt:59cm ecl:zzz\n',
  'eyr:2038 hcl:74454a iyr:2023\n',
  'pid:3556412378 byr:2007\n',
  '\n',

  // valid
  'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\n',
  'hcl:#623a2f\n',
  '\n',
  'eyr:2029 ecl:blu cid:129 byr:1989\n',
  'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm\n',
  '\n',
  'hcl:#888785\n',
  'hgt:164cm byr:2001 iyr:2015 cid:88\n',
  'pid:545766238 ecl:hzl\n',
  'eyr:2022\n',
  '\n',
  'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719\n',
];

describe('day 4', () => {
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(228);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(4);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(175);
  });
});
