import { inputAsStringArray } from '../utils/InputProcessor';
import { isDeepStrictEqual } from 'util';

type Coordinate = {
  x: number;
  y: number;
  z: number;
  w: number;
};

type Edges = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  minW: number;
  maxW: number;
};

const genCubes = (input: string[]): Set<Coordinate> => {
  const cubes = new Set<Coordinate>();
  input.forEach((line, y) =>
    line.split('').forEach((char, x) => {
      // coords are in the 4th quadrant of the xy plane, but that's ok
      if (char === '#') cubes.add({ x, y, z: 0, w: 0 });
    })
  );
  return cubes;
};

const getEdges = (cubes: Coordinate[]): Edges => {
  let minX = Number.MAX_SAFE_INTEGER,
    maxX = Number.MIN_SAFE_INTEGER,
    minY = Number.MAX_SAFE_INTEGER,
    maxY = Number.MIN_SAFE_INTEGER,
    minZ = Number.MAX_SAFE_INTEGER,
    maxZ = Number.MIN_SAFE_INTEGER,
    minW = Number.MAX_SAFE_INTEGER,
    maxW = Number.MIN_SAFE_INTEGER;
  cubes.forEach(({ x, y, z, w }) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
    minW = Math.min(minW, w);
    maxW = Math.max(maxW, w);
  });
  return {
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
    minW,
    maxW,
  };
};

const countAdjacentCubes = (
  cubes: Coordinate[],
  { x, y, z, w }: Coordinate,
  dims = 3
): number =>
  cubes.filter(
    ({ x: coordX, y: coordY, z: coordZ, w: coordW }) =>
      !isDeepStrictEqual(
        { x: coordX, y: coordY, z: coordZ, w: coordW },
        { x, y, z, w }
      ) &&
      Math.abs(x - coordX) <= 1 &&
      Math.abs(y - coordY) <= 1 &&
      Math.abs(z - coordZ) <= 1 &&
      (dims === 3 || Math.abs(w - coordW) <= 1)
  ).length;

const processCycle = (cubes: Coordinate[], dims = 3): Coordinate[] => {
  // Absolutely dreadful time performance to this one... I may come back and try to optimize this later like I did with
  // the seat counting day. This was just my faster to write solution and it is too late tonight to refactor code..
  // Note to self: If you refactor this, remove the note in the readme.
  const { minX, maxX, minY, maxY, minZ, maxZ, minW, maxW } = getEdges(cubes);
  const newCubes: Coordinate[] = [];
  const wBasis = dims === 3 ? 0 : minW - 1;
  const wCap = dims === 3 ? 0 : maxW + 1;
  for (let w = wBasis; w <= wCap; w++) {
    for (let x = minX - 1; x <= maxX + 1; x++) {
      for (let y = minY - 1; y <= maxY + 1; y++) {
        for (let z = minZ - 1; z <= maxZ + 1; z++) {
          const coord = { x, y, z, w };
          const adj = countAdjacentCubes(cubes, coord, dims);
          if (
            adj === 3 ||
            (cubes.some((testCoord) => isDeepStrictEqual(testCoord, coord)) &&
              adj === 2)
          ) {
            newCubes.push(coord);
          }
        }
      }
    }
  }
  return newCubes;
};

export const part1 = (input: string[]): number => {
  let cubes = [...genCubes(input)];
  for (let i = 0; i < 6; i++) {
    cubes = processCycle(cubes);
  }
  return cubes.length;
};

export const part2 = (input: string[]): number => {
  let cubes = [...genCubes(input)];
  for (let i = 0; i < 6; i++) {
    cubes = processCycle(cubes, 4);
  }
  return cubes.length;
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day17/input.txt');
    console.log(
      `Day 17:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
