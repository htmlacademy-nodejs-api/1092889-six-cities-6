import {config} from 'dotenv';
import {inject, injectable} from 'inversify';
import {Config} from './config.interface.js';
import {Logger} from '../logger/index.js';
import {Component} from '../../types/index.js';
import {CliSchema, configCliSchema} from './cli.schema.js';

@injectable()
class CliConfig implements Config<CliSchema> {
  private readonly config: CliSchema;
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    const parsedOutput = config();

    if(parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file doesn\'t exist.');
    }

    configCliSchema.load({});
    configCliSchema.validate({allowed:'strict', output: this.logger.info});
    this.config = configCliSchema.getProperties();
    this.logger.info('.env file found and successfully parsed');
  }

  public get<T extends keyof CliSchema>(key: T): CliSchema[T] {
    return this.config[key];
  }
}

export {CliConfig};
