import { part1 } from '../solution';
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

describe('day 16', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(71);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(24021);
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
