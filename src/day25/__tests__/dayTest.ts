import { part1 } from '../solution';

describe('day 25', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(5764801, 17807724)).toBe(14897079);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(8421034, 15993936)).toBe(9177528);
  });
});
