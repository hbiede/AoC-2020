import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day18/input.txt');

const inputExample = [
  '1 + 2 * 3 + 4 * 5 + 6',
  '1 + (2 * 3) + (4 * (5 + 6))',
  '2 * 3 + (4 * 5)',
  '5 + (8 * 3 + 9 + 3 * 4 * 3)',
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
  '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
];

describe('day 18', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(26457);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(464478013511);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(694173);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(85660197232452);
  });
});
