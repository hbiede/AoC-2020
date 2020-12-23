import { inputAsStringArray } from '../utils/InputProcessor';

const cupGame = (
  cups: number[],
  turns: number,
  maxCup = Math.max(...cups)
): number[] => {
  let currentCupIndex = 0;
  let currentBoard = [...cups];
  for (let turnCounter = 0; turnCounter < turns; turnCounter++) {
    // console.log();
    const hand = [
      currentBoard[(currentCupIndex + 1) % cups.length],
      currentBoard[(currentCupIndex + 2) % cups.length],
      currentBoard[(currentCupIndex + 3) % cups.length],
    ];
    const nextCup = currentBoard[(currentCupIndex + 4) % cups.length];
    // console.log('hand', hand);
    // console.log('next', nextCup);
    let destinationVal = currentBoard[currentCupIndex] - 1;
    currentBoard = currentBoard.filter((cup) => !hand.includes(cup));
    while (destinationVal === 0 || hand.includes(destinationVal)) {
      destinationVal--;
      if (destinationVal <= 0) {
        destinationVal = maxCup;
      }
    }
    // console.log('dest', destinationVal);
    const destinationIndex = currentBoard.findIndex(
      (cup) => cup === destinationVal
    );
    currentBoard = [
      ...currentBoard.slice(0, destinationIndex + 1),
      ...hand,
      ...currentBoard.slice(destinationIndex + 1),
    ];
    currentCupIndex = currentBoard.findIndex((cup) => cup === nextCup);
  }
  return currentBoard;
};

export const part1 = (input: number[]): number => {
  const result = cupGame(input, 100)
    .join('')
    .split('1')
    .filter((part) => part.length > 0);
  return Number.parseInt(
    result.length === 1 ? result[0] : result[1] + result[0],
    10
  );
};

export const part2 = (input: number[]): number => {
  // Yeah, this is dreadfully slow. This is a situation in which a
  // linkedlist would've been way better
  const bigBoard = [...input];
  for (let i = Math.max(...input); i <= 1000000; i++) bigBoard.push(i);
  const result = cupGame(bigBoard, 10000000, 1000000);
  const one = result.findIndex((cup) => cup === 1);
  return result[(one + 1) % result.length] * result[(one + 2) % result.length];
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day23/input.txt')[0]
      .split('')
      .map((char) => Number.parseInt(char, 10));
    console.log(
      `Day 23:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
