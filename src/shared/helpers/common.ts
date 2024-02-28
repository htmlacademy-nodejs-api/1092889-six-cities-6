const MEDIAN = 0.5;

const generateRandomValue = (min: number, max: number, precision = 0) => Number(((Math.random() * (max - min)) + min).toFixed(precision));

const generateRandomBoolean = () => Math.random() < MEDIAN;

const getRandomItems = <I>(items: I[]): I[] => {
  const startPosition = generateRandomValue(0, (items.length - 1));
  const endPosition = generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
};

const getRandomItem = <I>(items: I[]):I => items[generateRandomValue(0, items.length - 1)];

const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export {
  generateRandomBoolean,
  generateRandomValue,
  getRandomItems,
  getRandomItem,
  getErrorMessage
};

