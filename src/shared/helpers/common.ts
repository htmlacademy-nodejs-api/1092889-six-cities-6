import {ClassConstructor, plainToInstance} from 'class-transformer';
import {ValidationError} from 'class-validator';
import {ApplicationError, ValidationErrorField} from '../libs/rest/index.js';

const enum SortType {
  DOWN = -1,
  UP = 1
}

const DEFAULT_ENCODING = 'utf-8';
const TRUE_STRING = 'true';
const MEDIAN = 0.5;


const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) => plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

const createErrorObject = (errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) => ({errorType, error, details });

const reduceValidationErrors = (errors: ValidationError[]): ValidationErrorField[] => errors
  .map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const getBooleanFromString = (value: string) => value === TRUE_STRING;
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
  DEFAULT_ENCODING,
  generateRandomBoolean,
  generateRandomValue,
  getRandomItems,
  getRandomItem,
  getErrorMessage,
  fillDTO,
  createErrorObject,
  reduceValidationErrors,
  getFullServerPath,
  getBooleanFromString,
  SortType
};

