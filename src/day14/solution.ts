import { inputAsStringArray } from '../utils/InputProcessor';

export const part1 = (input: string[]): number => {
  let mask = '';
  const mem: Record<number, number> = {};
  const memRegex = /mem\[(\d+)] = (\d+)/;
  input.forEach((line) => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1];
    } else {
      const [, memAddress, decValue] = memRegex.exec(line) ?? ['', '0', '0'];
      const binaryVal = Number.parseInt(decValue, 10).toString(2);
      const result = `${'0'.repeat(36 - binaryVal.length)}${binaryVal}`
        .split('')
        .map((char, i) => (mask.charAt(i) === 'X' ? char : mask.charAt(i)))
        .join('');
      mem[Number.parseInt(memAddress, 10)] = Number.parseInt(result, 2);
    }
  });
  return Object.values(mem).reduce((acc, val) => acc + val, 0);
};

export const part2 = (input: string[]): number => {
  let mask = '';
  const mem: Record<number, number> = {};
  const memRegex = /mem\[(\d+)] = (\d+)/;
  input.forEach((line) => {
    if (line.startsWith('mask')) {
      mask = line.split(' = ')[1];
    } else {
      const [, memAddress, decValueString] = memRegex.exec(line) ?? [
        '',
        '0',
        '0',
      ];
      const binaryAdd = Number.parseInt(memAddress, 10).toString(2);
      const decValue = Number.parseInt(decValueString, 10);
      let xCount = 0;
      const addressCombos = `${'0'.repeat(36 - binaryAdd.length)}${binaryAdd}`
        .split('')
        .map((char, i) => {
          if (mask.charAt(i) === 'X') {
            xCount++;
            return 'X';
          }
          if (mask.charAt(i) === '1') return '1';
          return char;
        });

      for (let i = 0; i < 2 ** xCount; i++) {
        const replaceBase = i.toString(2);
        const floatReplace = `${'0'.repeat(
          xCount - replaceBase.length
        )}${replaceBase}`;
        let replaceIndex = 0;
        mem[
          Number.parseInt(
            addressCombos
              .map((char) =>
                char === 'X' ? floatReplace.charAt(replaceIndex++) : char
              )
              .join(''),
            2
          )
        ] = decValue;
      }
    }
  });
  return Object.values(mem).reduce((acc, val) => acc + val, 0);
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day14/input.txt');
    console.log(
      `Day 14:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
