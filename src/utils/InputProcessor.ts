import * as fs from 'fs';

export const inputAsText = (file: string): string => {
  return fs.readFileSync(file, 'utf8');
};

export const inputAsStringArray = (file: string, delimiter = '\n'): string[] =>
  inputAsText(file).split(delimiter);

export const inputAsNumArray = (
  file: string,
  delimiter = '\n',
  base = 10
): number[] =>
  inputAsStringArray(file, delimiter)
    .filter((line) => line.length > 0)
    .map((num) => Number.parseInt(num, base));
