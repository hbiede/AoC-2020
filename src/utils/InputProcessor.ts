import * as fs from 'fs';

export const inputAsText = (file: string): string => {
  return fs.readFileSync(file, 'utf8');
};

export const inputAsNumArray = (
  file: string,
  delimiter: string,
  base = 10
): number[] => {
  return inputAsText(file)
    .split(delimiter)
    .map((num) => Number.parseInt(num, base));
};
