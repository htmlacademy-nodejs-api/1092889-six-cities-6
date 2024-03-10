import {Request} from 'express';
import {RequestBody} from '../../../libs/rest/index.js';
import {UpdateOfferDto} from '../dto/update-offer.dto.js';
import {ParamOfferId} from '../../../types/param-offerid.type.js';

type UpdateOfferRequest = Request<ParamOfferId, RequestBody, UpdateOfferDto>;

export {UpdateOfferRequest};
