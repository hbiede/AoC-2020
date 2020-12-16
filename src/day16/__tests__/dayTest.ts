import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day16/input.txt');

const inputExample = [
  'class: 1-3 or 5-7',
  'row: 6-11 or 33-44',
  'seat: 13-40 or 45-50',
  '',
  'your ticket:',
  '7,1,14',
  '',
  'nearby tickets:',
  '7,3,47',
  '40,4,50',
  '55,2,20',
  '38,6,12',
];

const inputExample2 = [
  'class: 0-1 or 4-19',
  'row: 0-5 or 8-19',
  'seat: 0-13 or 16-19',
  '',
  'your ticket:',
  '11,12,13',
  '',
  'nearby tickets:',
  '3,9,18',
  '15,1,5',
  '5,14,9',
];

describe('day 16', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(71);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(24021);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample, /^(?:class|row|seat)/)).toBe(98);
    expect(part2(inputExample2, /^(?:class|row|seat)/)).toBe(1716);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(1289178686687);
  });
});
