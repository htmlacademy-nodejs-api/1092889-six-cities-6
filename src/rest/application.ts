import {inject, injectable} from 'inversify';
import {Logger} from '../shared/libs/logger/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Component} from '../shared/types/index.js';

@injectable()
class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>) {}

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`The PORT value from env is ${this.config.get('PORT')}`);
  }
}

export {Application};

