import { inputAsStringArray } from '../utils/InputProcessor';

const binaryFind = (input: string, lowerLetterIndicator: string): number => {
  let min = 0;
  let max = Math.pow(2, input.length) - 1;
  for (let i = 0; i < input.length; i++) {
    const middle = Math.ceil((max - min) / 2);
    if (input[i] === lowerLetterIndicator) {
      max -= middle;
    } else {
      min += middle;
    }
  }
  return min;
};

export const getSeatIDs = (input: string[]): number[] =>
  input
    .map(
      (row) =>
        binaryFind(row.slice(0, 7), 'F') * 8 + binaryFind(row.slice(7), 'L')
    )
    .sort();

export const part1 = (input: number[]): number => Math.max(...input);

export const part2 = (input: number[]): number => {
  const sortedSeats = input.sort((a, b) => (a < b ? -1 : 1));
  const lastSeat = sortedSeats[sortedSeats.length - 1];
  let previous = sortedSeats[0];
  for (let i = 1; i < lastSeat - 1; i++) {
    if (previous + 1 !== sortedSeats[i] && previous + 2 === sortedSeats[i])
      return previous + 1;
    previous = sortedSeats[i];
  }
  return input.length;
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day5/input.txt');
    const seatIDs = getSeatIDs(input);
    console.log(
      `Day 5:\n  Part 1:  ${part1(seatIDs)}\n  Part 2:  ${part2(seatIDs)}`
    );
  })();
}
