import {City} from '../../../types/index.js';
import {Query} from 'express-serve-static-core';

type RequestQuery = {
  city?: City
} | Query;

export {RequestQuery};
