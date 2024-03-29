import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../types/index.js';
import {OfferService} from './types/offer-service.interface.js';
import {DefaultOfferService} from './default-offer.service.js';
import {Controller} from '../../libs/rest/index.js';
import {OfferController} from './offer.controller.js';
import {OfferModel} from '../models-init.js';

const createOfferContainer = () => {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  return offerContainer;
};

export {createOfferContainer};
