import 'reflect-metadata';
import {Application} from './rest/index.js';
import {Component} from './shared/types/index.js';
import {containerInit} from './container.init.js';

const bootstrap = async () => {
  const appContainer = containerInit();

  const application = appContainer.get<Application>(Component.Application);
  await application.init();
};

bootstrap();
