import * as Mongoose from 'mongoose';
import {inject, injectable} from 'inversify';
import {setTimeout} from 'node:timers/promises';
import {DatabaseClient} from './database-client.interface.js';
import {Component} from '../../types/index.js';
import {Logger} from '../logger/index.js';

const enum RetryOptions {
  MAX_COUNT = 5,
  TIMEOUT = 1000
}

@injectable()
class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDb client already connected');
    }

    let attempt = 0;
    while (attempt < RetryOptions.MAX_COUNT) {
      this.logger.info('Trying to establish connection to database');
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to establish connection to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(RetryOptions.TIMEOUT);
      }
    }

    throw new Error(`Unable to establish connection to database after ${attempt} failed attempts`);
  }

  public async disconnect(): Promise<void> {
    if(!this.isConnectedToDatabase()) {
      throw new Error('Not connected to database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed');
  }
}

export {MongoDatabaseClient};
