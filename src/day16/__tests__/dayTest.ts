import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day16/input.txt');

const inputExample = [''];

describe('day 16', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(127);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(393911906);
  });
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should solve part 2 with example input', () => {
  //   expect(part2(inputExample)).toBe(62);
  // });
  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should solve part 2 with my assigned input', () => {
  //   expect(part2(input)).toBe(1289178686687);
  // });
});
