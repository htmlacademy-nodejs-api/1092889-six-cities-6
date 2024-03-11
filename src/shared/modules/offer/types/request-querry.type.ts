import {City} from '../../../types/index.js';
import {Query} from 'express-serve-static-core';

type RequestQuery = {
  city?: City,
  limit?: number
} | Query;

export {RequestQuery};
