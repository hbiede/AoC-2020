import { inputAsStringArray } from '../utils/InputProcessor';

export const part1 = (input: string[]): number => {
  let x = 0;
  let y = 0;
  let d = 0;
  input.forEach((instruction) => {
    const moveCount = Number.parseInt(instruction.slice(1), 10);
    switch (instruction[0]) {
      case 'N':
        y += moveCount;
        break;
      case 'S':
        y -= moveCount;
        break;
      case 'E':
        x += moveCount;
        break;
      case 'W':
        x -= moveCount;
        break;
      case 'L':
        d += moveCount;
        if (d > 360) d -= 360;
        break;
      case 'R':
        d -= moveCount;
        if (d < 0) d += 360;
        break;
      default:
        switch (d) {
          case 90:
            y += moveCount;
            break;
          case 180:
            x -= moveCount;
            break;
          case 270:
            y -= moveCount;
            break;
          default:
            x += moveCount;
            break;
        }
    }
  });
  return Math.abs(x) + Math.abs(y);
};

export const part2 = (input: string[]): number => {
  let x = 0;
  let y = 0;
  let toWaypointX = 10;
  let toWaypointY = 1;
  input.forEach((instruction) => {
    const moveCount = Number.parseInt(instruction.slice(1), 10);
    switch (instruction[0]) {
      case 'N':
        toWaypointY += moveCount;
        break;
      case 'S':
        toWaypointY -= moveCount;
        break;
      case 'E':
        toWaypointX += moveCount;
        break;
      case 'W':
        toWaypointX -= moveCount;
        break;
      case 'L':
        for (let i = 0; i * 90 < moveCount; i++) {
          const oldX = toWaypointX;
          toWaypointX = -1 * toWaypointY;
          // noinspection JSSuspiciousNameCombination
          toWaypointY = oldX;
        }
        break;
      case 'R':
        for (let i = 0; i * 90 < moveCount; i++) {
          const oldY = toWaypointY;
          toWaypointY = -1 * toWaypointX;
          // noinspection JSSuspiciousNameCombination
          toWaypointX = oldY;
        }
        break;
      default:
        x += toWaypointX * moveCount;
        y += toWaypointY * moveCount;
    }
  });
  return Math.abs(x) + Math.abs(y);
};

const input = inputAsStringArray('src/day12/input.txt').filter(
  (line) => line.length > 0
);
console.log(`Day 12:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`);
