import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day12/input.txt');

const inputExample = ['F10', 'N3', 'F7', 'R90', 'F11'];

describe('day 12', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(25);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(2879);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(286);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(178986);
  });
});
