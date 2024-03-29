import {Request} from 'express';
import {RequestQuery} from './request-querry.type.js';

type WithQueryOfferRequest = Request<unknown, unknown, unknown, RequestQuery>;

export {WithQueryOfferRequest};
