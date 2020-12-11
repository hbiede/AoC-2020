import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day11/input.txt');

const inputExample = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
];

describe('day 11', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(37);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(2470);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(26);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(2259);
  });
});
