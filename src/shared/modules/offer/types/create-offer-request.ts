import {Request} from 'express';
import {RequestParams} from '../../../libs/rest/index.js';
import {RequestBody} from '../../../libs/rest/index.js';
import {CreateOfferDto} from '../dto/create-offer.dto.js';

type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;

export {CreateOfferRequest};
