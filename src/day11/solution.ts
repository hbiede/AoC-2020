import { inputAsStringArray } from '../utils/InputProcessor';

export const part1 = (input: string[]): number => {
  const emptyRow = '.'.repeat(input[0].length + 2);
  const wrappedInput = [
    [...emptyRow],
    ...input.map((row) => ['.', ...row.split(''), '.']),
    [...emptyRow],
  ];
  let current: string[][] = wrappedInput.map((row: string[]) => [...row]);
  let lastRound: string[][] = current.map((row: string[]) => [...row]);

  let rounds = 0;
  do {
    const counts = current.map((row: string[]) => row.map(() => 0));
    for (let i = 1; i < current.length - 1; i++) {
      for (let j = 1; j < current[i].length - 1; j++) {
        if (current[i][j] === '#') {
          for (let horSlope = -1; horSlope <= 1; horSlope++) {
            for (let vertSlope = -1; vertSlope <= 1; vertSlope++) {
              if (vertSlope !== 0 || horSlope !== 0) {
                counts[i + vertSlope][j + horSlope]++;
              }
            }
          }
        }
      }
    }
    lastRound = current.map((row: string[]) => [...row]);
    current = counts.map((row, i) =>
      row.map((seat, j) => {
        if (lastRound[i][j] === 'L' && seat === 0) return '#';
        if (lastRound[i][j] === '#' && seat >= 4) return 'L';
        return lastRound[i][j];
      })
    );
    rounds++;
  } while (
    current.map((row) => row.join('')).join('\n') !==
    lastRound.map((row) => row.join('')).join('\n')
  );
  console.log(rounds);
  return current.reduce(
    (acc, row) =>
      acc + row.reduce((acc2, seat) => acc2 + (seat === '#' ? 1 : 0), 0),
    0
  );
};

export const part2 = (input: string[]): number => {
  const nearestSeat = (
    seats: string[][],
    i: number,
    j: number,
    horSlope: number,
    vertSlope: number
  ): { x: number; y: number } | null => {
    let x = j + horSlope;
    let y = i + vertSlope;
    do {
      if (seats[y][x] === 'L' || seats[y][x] === '#') {
        return { x, y };
      }
      x += horSlope;
      y += vertSlope;
    } while (x > 0 && y > 0 && y < seats.length && x < seats[y].length);
    return null;
  };
  const emptyRow = '.'.repeat(input[0].length + 2);
  const wrappedInput = [
    [...emptyRow],
    ...input.map((row) => ['.', ...row.split(''), '.']),
    [...emptyRow],
  ];
  let current: string[][] = wrappedInput.map((row: string[]) => [...row]);
  let lastRound: string[][] = current.map((row: string[]) => [...row]);

  let rounds = 0;
  do {
    const counts = current.map((row: string[]) => row.map(() => 0));
    for (let i = 1; i < current.length - 1; i++) {
      for (let j = 1; j < current[i].length - 1; j++) {
        if (current[i][j] === '#') {
          for (let horSlope = -1; horSlope <= 1; horSlope++) {
            for (let vertSlope = -1; vertSlope <= 1; vertSlope++) {
              if (vertSlope !== 0 || horSlope !== 0) {
                const nearest = nearestSeat(current, i, j, horSlope, vertSlope);
                if (nearest) {
                  counts[nearest.y][nearest.x]++;
                }
              }
            }
          }
        }
      }
    }
    lastRound = current.map((row: string[]) => [...row]);
    current = counts.map((row, i) =>
      row.map((seat, j) => {
        if (lastRound[i][j] === 'L' && seat === 0) return '#';
        if (lastRound[i][j] === '#' && seat >= 5) return 'L';
        return lastRound[i][j];
      })
    );
    rounds++;
  } while (
    current.map((row) => row.join('')).join('') !==
    lastRound.map((row) => row.join('')).join('')
  );
  console.log(rounds);
  return current.reduce(
    (acc, row) =>
      acc + row.reduce((acc2, seat) => acc2 + (seat === '#' ? 1 : 0), 0),
    0
  );
};

const input = inputAsStringArray('src/day11/input.txt').filter(
  (line) => line.length > 0
);
console.log(`Day 11:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
