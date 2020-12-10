import { part1, part2 } from '../solution';
import { inputAsNumArray } from '../../utils/InputProcessor';

const input = inputAsNumArray('src/day10/input.txt');

const inputExample = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
const inputExample2 = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];

describe('day 10', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(35);
    expect(part1(inputExample2)).toBe(220);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(1856);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(8);
    expect(part2(inputExample2)).toBe(19208);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(2314037239808);
  });
});
