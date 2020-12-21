import { part1, part2 } from '../solution';
import { inputAsStringArray } from '../../utils/InputProcessor';

const input = inputAsStringArray('src/day21/input.txt');

const inputExample = [
  'mxmxvkd kfcds sqjhc nhms (contains dairy, fish)',
  'trh fvjkl sbzzf mxmxvkd (contains dairy)',
  'sqjhc fvjkl (contains soy)',
  'sqjhc mxmxvkd sbzzf (contains fish)',
];

describe('day 21', () => {
  it('should solve part 1 with example input', () => {
    expect(part1(inputExample)).toBe(5);
  });
  it('should solve part 1 with my assigned input', () => {
    expect(part1(input)).toBe(1913);
  });
  it('should solve part 2 with example input', () => {
    expect(part2(inputExample)).toBe('mxmxvkd,sqjhc,fvjkl');
  });
  it('should solve part 2 with my assigned input', () => {
    expect(part2(input)).toBe(
      'gpgrb,tjlz,gtjmd,spbxz,pfdkkzp,xcfpc,txzv,znqbr'
    );
  });
});
