import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day22/input.txt');

const inputExample = [
  'Player 1:',
  '9',
  '2',
  '6',
  '3',
  '1',
  '',
  'Player 2:',
  '5',
  '8',
  '4',
  '7',
  '10',
];

describe('day 22', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(306);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(30197);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(291);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(34031);
  });
});
