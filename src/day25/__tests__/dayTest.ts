import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day25/input.txt');

const inputExample = [''];

describe('day 25', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(127);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(393911906);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(62);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(59341885);
  });
});
