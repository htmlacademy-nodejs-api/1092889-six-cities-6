import {CityName} from '../../../types/index.js';
import {Query} from 'express-serve-static-core';

type RequestQuery = {
  cityName?: CityName,
  limit?: number
} | Query;

export {RequestQuery};
