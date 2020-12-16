import { inputAsText } from '../utils/InputProcessor';

export const part1 = (input: string): number => {
  const [earliestDept, idStrings] = input.split('\n');
  const earliestDeptTime = Number.parseInt(earliestDept, 10);
  const ids = idStrings
    .split(',')
    .filter((id) => id !== 'x')
    .map((id) => Number.parseInt(id, 10));
  const timeToLeave = ids.map((id) => id - (earliestDeptTime % id));
  const soonest = Math.min(...timeToLeave);
  return ids[timeToLeave.findIndex((time) => soonest === time)] * soonest;
};

export const part2 = (input: string, startSearchAt = 0): number => {
  const [, idStrings] = input.split('\n');
  const ids = idStrings
    .split(',')
    .map((id) => (id === 'x' ? -1 : Number.parseInt(id, 10)));
  let t = startSearchAt;
  let increment = 1;
  ids.forEach((val, i) => {
    if (val > 0) {
      while ((t + i) % val !== 0) {
        t += increment;
      }
      increment *= val; // Increment to the next time that array[0...i] has the correct remainders
    }
  });
  return t;
};

if (require.main === module) {
  (() => {
    const input = inputAsText('src/day13/input.txt');
    console.log(
      `Day 13:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
