import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day6/input.txt');

const inputExample = [
  'abc',
  '',
  'a',
  'b',
  'c',
  '',
  'ab',
  'ac',
  '',
  'a',
  'a',
  'a',
  'a',
  '',
  'b',
  '',
];

describe('day 6', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(11);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(6930);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(6);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(3585);
  });
});
