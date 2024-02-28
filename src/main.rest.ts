import 'reflect-metadata';
import {Logger, PinoLogger} from './shared/libs/logger/index.js';
import {Application} from './rest/index.js';
import {Config, RestConfig, RestSchema} from './shared/libs/config/index.js';
import {Container} from 'inversify';
import {Component} from './shared/types/index.js';

const bootstrap = async () => {
  const container = new Container();
  container.bind<Application>(Component.Application).to(Application).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<Application>(Component.Application);
  await application.init();
};

bootstrap();
