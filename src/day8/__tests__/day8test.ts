import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day8/input.txt');

const inputExample = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6',
];

describe('day 8', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(5);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(1548);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(8);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(1375);
  });
});
