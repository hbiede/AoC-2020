import { inputAsStringArray } from '../utils/InputProcessor';

type Coord = {
  x: number;
  y: number;
};

const getDirections = (referenceString: string): string[] => {
  const returnVal = [];
  for (let i = 0; i < referenceString.length; i++) {
    const thisLetter = referenceString.charAt(i);
    switch (thisLetter) {
      case 'n':
      case 's':
        returnVal.push(thisLetter + referenceString.charAt(i + 1));
        i++;
        break;
      default:
        returnVal.push(thisLetter);
    }
  }
  return returnVal;
};
const getCoord = (
  referenceString: string,
  seed: Coord = { x: 0, y: 0 }
): Coord =>
  getDirections(referenceString).reduce((acc, char) => {
    switch (char) {
      case 'e':
        acc.x += 2;
        break;
      case 'w':
        acc.x -= 2;
        break;
      case 'ne':
        acc.x++;
        acc.y++;
        break;
      case 'se':
        acc.x++;
        acc.y--;
        break;
      case 'nw':
        acc.x--;
        acc.y++;
        break;
      case 'sw':
        acc.x--;
        acc.y--;
        break;
    }
    return acc;
  }, seed);

const getInitialTiles = (input: string[]): Set<string> => {
  const blackTiles = new Set<string>();
  input
    .map((line) => getCoord(line))
    .sort((a, b) => (a.x < b.x ? -1 : 1))
    .forEach((coord) => {
      const coordString = `${coord.x},${coord.y}`;
      if (blackTiles.has(coordString)) blackTiles.delete(coordString);
      else blackTiles.add(coordString);
    });
  return blackTiles;
};

const getAdjacentTiles = (tile: string): string[] => {
  const [x, y] = tile.split(',').map((coord) => Number.parseInt(coord, 10));
  return [
    `${x + 2},${y}`,
    `${x - 2},${y}`,
    `${x + 1},${y + 1}`,
    `${x + 1},${y - 1}`,
    `${x - 1},${y + 1}`,
    `${x - 1},${y - 1}`,
  ];
};

const getAdjacentCount = (tiles: Set<string>, tile: string): number =>
  getAdjacentTiles(tile).filter((tile) => tiles.has(tile)).length;

const processDay = (tiles: Set<string>): Set<string> => {
  const possibilities = new Set<string>();
  tiles.forEach((tile) =>
    getAdjacentTiles(tile).forEach((adj) => possibilities.add(adj))
  );
  return new Set(
    [...possibilities].filter((tile) => {
      const adj = getAdjacentCount(tiles, tile);
      return (
        adj === 2 ||
        (tiles.has(tile) && adj === 1) ||
        (!tiles.has(tile) && adj === 2)
      );
    })
  );
};

export const part1 = (input: string[]): number => getInitialTiles(input).size;

export const part2 = (input: string[]): number => {
  let tileState = getInitialTiles(input);
  for (let i = 0; i < 100; i++) {
    tileState = processDay(tileState);
  }
  return tileState.size;
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day24/input.txt');
    console.log(
      `Day 24:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
