import { inputAsStringArray } from '../utils/InputProcessor';

const breakdown = /([\w\s]+) \(contains ([\w,\s]+)\)/;
type PossibleAllergens = Record<string, string[]>;
const mapIngredientsToPossibleAllergens = (
  input: string[]
): { possible: PossibleAllergens; ingredients: Record<string, number> } => {
  const mapping: PossibleAllergens = {};
  const ingList: Record<string, number> = {};
  input.forEach((line) => {
    const [test, ingredients, allergens] = breakdown.exec(line) ?? [
      'fail',
      '',
      '',
    ];
    if (test !== 'fail') {
      const ingredientList = ingredients.split(' ');
      ingredientList.forEach((ing) => {
        const ingredientCount = ingList[ing];
        if (ingredientCount) ingList[ing]++;
        else ingList[ing] = 1;
      });
      allergens.split(', ').forEach((allergen) => {
        if (!mapping[allergen]) mapping[allergen] = ingredientList;
        else
          mapping[allergen] = mapping[allergen].filter((ing) =>
            ingredientList.includes(ing)
          );
        mapping[allergen];
      });
    }
  });
  return { possible: mapping, ingredients: ingList };
};

const findSafeIngredients = (
  mapping: PossibleAllergens,
  ingList: string[]
): string[] => {
  let safeList = [...ingList];
  Object.values(mapping).forEach((ingredients) => {
    safeList = safeList.filter((ing) => !ingredients.includes(ing));
  });
  return safeList;
};

const determineAllergens = (
  mapping: PossibleAllergens
): Record<string, string> => {
  console.log(mapping);
  const pairings: Record<string, string> = {};
  const allergens = [...Object.keys(mapping)];
  let remainingAllergens = [...allergens];
  while (remainingAllergens.length > 0) {
    allergens.forEach((allergen) => {
      if (mapping[allergen].length === 1 && !pairings[allergen]) {
        console.log('reducing', allergen);
        console.log('paired with', mapping[allergen][0]);
        const matchingIngredient = mapping[allergen][0];
        pairings[allergen] = matchingIngredient;
        remainingAllergens.forEach((remainingAllergen) => {
          mapping[remainingAllergen] = mapping[remainingAllergen].filter(
            (ingredient) => ingredient !== matchingIngredient
          );
        });
        remainingAllergens = remainingAllergens.filter(
          (all) => all !== allergen
        );
        console.log('pairings', pairings);
      }
    });
  }
  console.log(pairings);
  return pairings;
};

export const part1 = (input: string[]): number => {
  const { possible, ingredients } = mapIngredientsToPossibleAllergens(input);
  const safes = findSafeIngredients(possible, Object.keys(ingredients));
  return safes.reduce((acc, safe) => acc + ingredients[safe], 0);
};

export const part2 = (input: string[]): string => {
  const { possible } = mapIngredientsToPossibleAllergens(input);
  const pairings = determineAllergens(possible);
  return Object.entries(pairings)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, val]) => val)
    .join(',');
};

if (require.main === module) {
  (() => {
    const input = inputAsStringArray('src/day21/input.txt');
    console.log(
      `Day 21:\n  Part 1:  ${part1(input)}\n  Part 2:  ${part2(input)}`
    );
  })();
}
