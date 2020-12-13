import { part1, part2 } from '../solution';

const input =
  '1000511\n' +
  '29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,409,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,19,x,x,x,23,' +
  'x,x,x,x,x,x,x,353,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41';

const inputExample = '939\n7,13,x,x,59,x,31,19';
const inputExample2 = '\n17,x,13,19';
const inputExample3 = '\n67,7,59,61';
const inputExample4 = '\n67,x,7,59,61';
const inputExample5 = '\n67,7,x,59,61';
const inputExample6 = '\n1789,37,47,1889';

describe('day 13', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(295);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(222);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe(1068781);
    expect(part2(inputExample2)).toBe(3417);
    expect(part2(inputExample3)).toBe(754018);
    expect(part2(inputExample4)).toBe(779210);
    expect(part2(inputExample5)).toBe(1261476);
    expect(part2(inputExample6)).toBe(1202161486);
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input, 100000000000000)).toBe(408270049879073);
  });
});
