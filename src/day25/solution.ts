import { inputAsStringArray } from '../utils/InputProcessor';

export const part1 = (
  card: number,
  door: number,
  subjectNumber = 7
): number => {
  const loop = {
    card: 0,
    door: 0,
  };
  let value = 1;
  let loopCounter = 1;
  while (loop.card === 0 || loop.door === 0) {
    value *= subjectNumber;
    value %= 20201227;
    if (card === value) loop.card = loopCounter;
    else if (door === value) loop.door = loopCounter;
    loopCounter++;
  }
  value = 1;
  for (let i = 0; i < loop.card; i++) {
    value *= door;
    value %= 20201227;
  }
  return value;
};

if (require.main === module) {
  (() => {
    const [card, door] = inputAsStringArray('src/day25/input.txt').map((line) =>
      Number.parseInt(line, 10)
    );
    console.log(`Day 25:\n  Part 1:  ${part1(card, door)}\nThat's it!!`);
  })();
}
