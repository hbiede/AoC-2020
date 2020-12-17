import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day17/input.txt');

const inputExample = ['.#.', '..#', '###'];

describe('day 17', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(112);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(359);
  });
  // Quite long... Uncomment if you're willing to wait up to 5 minutes
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should solve part 2 with example input', () => {
  //   expect(part2(inputExample)).toBe(848);
  // });
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should solve part 2 with my assigned input', () => {
  //   expect(part2(input)).toBe(2228);
  // });
});
