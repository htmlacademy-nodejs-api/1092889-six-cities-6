import {Request} from 'express';
import {RequestQuery} from './request-querry.type.js';

type PremiumOfferRequest = Request<unknown, unknown, unknown, RequestQuery>;

export {PremiumOfferRequest};
