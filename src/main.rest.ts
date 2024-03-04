import 'reflect-metadata';
import {Application} from './rest/index.js';
import {Component} from './shared/types/index.js';
import {createRestApplicationContainer} from './rest/container.js';
import {Container} from 'inversify';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';

const bootstrap = async () => {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer());

  const application = appContainer.get<Application>(Component.Application);
  await application.init();
};

bootstrap();
