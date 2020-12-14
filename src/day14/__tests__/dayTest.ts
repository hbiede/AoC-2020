import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day14/input.txt');

const inputExample = [
  'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
  'mem[8] = 11',
  'mem[7] = 101',
  'mem[8] = 0',
];
const inputExample2 = [
  'mask = 000000000000000000000000000000X1001X',
  'mem[42] = 100',
  'mask = 00000000000000000000000000000000X0XX',
  'mem[26] = 1',
];

describe('day 14', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(165);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(17934269678453);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample2)).toBe(208);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(3440662844064);
  });
});
