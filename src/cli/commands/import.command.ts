import chalk from 'chalk';
import {Command} from './command.interface.js';
import {TsvFileReader} from '../../shared/libs/file-reader/index.js';

class ImportCommand implements Command {
  get name(): string {
    return '--import';
  }

  public async execute(...parameters: string[]){
    const [filename] = parameters;
    const fileReader = new TsvFileReader(filename.trim());

    try {
      await fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if(!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}

export {ImportCommand};
