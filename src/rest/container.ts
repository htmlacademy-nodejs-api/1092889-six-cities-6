import {Container} from 'inversify';
import {Application} from './application.js';
import {Component} from '../shared/types/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {AppExceptionFilter, ExceptionFilter} from '../shared/libs/rest/index.js';
import {ValidationExceptionFilter} from '../shared/libs/rest/exception-filter/validation.exception-filter.js';
import {HttpErrorExceptionFilter} from '../shared/libs/rest/exception-filter/http-error.exception-filter.js';
import {PathTransformer} from '../shared/libs/rest/transform/path-transformer.js';

const createRestApplicationContainer = () => {
  const container = new Container();

  container.bind<Application>(Component.Application).to(Application).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.RestConfig).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();
  return container;
};

export {createRestApplicationContainer};

