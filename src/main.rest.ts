import 'reflect-metadata';
import {Application} from './rest/index.js';
import {Component} from './shared/types/index.js';
import {containerRestInit} from './container.rest.init.js';

const bootstrap = async () => {
  const appContainer = containerRestInit();

  const application = appContainer.get<Application>(Component.Application);
  await application.init();
};

bootstrap();
