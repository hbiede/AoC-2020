import { part1 } from '../solution';

describe('day 23', () => {
  it('should solve part 1 with example input', () => {
    expect(part1([3, 8, 9, 1, 2, 5, 4, 6, 7])).toBe(67384529);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1([6, 8, 5, 9, 7, 4, 2, 1, 3])).toBe(82635947);
  });
});
