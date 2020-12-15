import { part1, part2 } from '../solution';

const inputExample = [1, 3, 2];
const inputExample2 = [2, 1, 3];
const inputExample3 = [1, 2, 3];
const inputExample4 = [2, 3, 1];
const inputExample5 = [3, 2, 1];
const inputExample6 = [3, 1, 2];

describe('day 15', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(1);
    expect(part1(inputExample2)).toBe(10);
    expect(part1(inputExample3)).toBe(27);
    expect(part1(inputExample4)).toBe(78);
    expect(part1(inputExample5)).toBe(438);
    expect(part1(inputExample6)).toBe(1836);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(2578);
    expect(part2(inputExample2)).toBe(3544142);
  });
});
