import got from 'got';
import {Command} from './command.interface.js';
import {MockServerData} from '../../shared/types/index.js';
import {TSVOfferGenerator} from '../../shared/libs/offer-generator/index.js';
import {TSVFileWriter} from '../../shared/libs/file-writer/index.js';
import {getErrorMessage} from '../../shared/helpers/index.js';
import chalk from 'chalk';
import {injectable} from 'inversify';

@injectable()
class GenerateCommand implements Command{
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Cannot load data from ${url}`);
    }
  }

  private async write(filepath: string, count: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < count; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  get name(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File at ${filepath} was created`);
    } catch(error: unknown) {
      console.error(chalk.red('Can\'t generate data'));
      console.error(chalk.red(getErrorMessage(error)));
    }

  }
}

export {GenerateCommand};

