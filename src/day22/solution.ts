import { inputAsStringArray } from '../utils/InputProcessor';

const playGame = (
  player1Deck: number[],
  player2Deck: number[],
  isRecursive: boolean,
  level = 1
): { one: number; two: number } => {
  const previousGames: Record<string, boolean> = {};
  while (player1Deck.length > 0 && player2Deck.length > 0) {
    const player1Card = player1Deck[0];
    const player2Card = player2Deck[0];

    let isPlayer1Winner = player1Card > player2Card;
    if (isRecursive) {
      const playState = player1Deck.join('') + '-' + player2Deck.join('');
      if (previousGames[playState]) {
        return { one: 1, two: 0 };
      }
      previousGames[playState] = true;
      if (
        player1Card < player1Deck.length &&
        player2Card < player2Deck.length
      ) {
        const result = playGame(
          player1Deck.slice(1, 1 + player1Card),
          player2Deck.slice(1, 1 + player2Card),
          true,
          level + 1
        );
        isPlayer1Winner = result.one > result.two;
      } else {
        isPlayer1Winner = player1Card > player2Card;
      }
    } else {
      isPlayer1Winner = player1Card > player2Card;
    }

    if (isPlayer1Winner) {
      player1Deck = [...player1Deck.slice(1), player1Card, player2Card];
      player2Deck = [...player2Deck.slice(1)];
    } else {
      player2Deck = [...player2Deck.slice(1), player2Card, player1Card];
      player1Deck = [...player1Deck.slice(1)];
    }
  }
  return {
    one: player1Deck.reverse().reduce((acc, val, i) => acc + val * (i + 1), 0),
    two: player2Deck.reverse().reduce((acc, val, i) => acc + val * (i + 1), 0),
  };
};

const setupGame = (input: string[], isRecursive = false): number => {
  const split = input.findIndex((line) => line.trim().length === 0);
  return Math.max(
    ...Object.values(
      playGame(
        input.slice(1, split).map((line) => Number.parseInt(line, 10)),
        input.slice(split + 2).map((line) => Number.parseInt(line, 10)),
        isRecursive
      )
    )
  );
};

export const part1 = (input: string[]): number => setupGame(input, false);

export const part2 = (input: string[]): number => setupGame(input, true);

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day22/input.txt');
    console.log(
      `Day 22:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
