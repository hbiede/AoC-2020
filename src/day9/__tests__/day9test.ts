import { part1, part2 } from '../solution';
import { inputAsNumArray } from '../../utils/InputProcessor';

const input = inputAsNumArray('src/day9/input.txt');

const inputExample = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576,
];

describe('day 9', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample, 5)).toBe(127);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(393911906);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample, 127)).toBe(62);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input, 393911906)).toBe(59341885);
  });
});
