import {WriteStream} from 'node:fs';
import {createWriteStream} from 'node:fs';
import {FileWriter} from './file-writer.interface.js';
import {DEFAULT_ENCODING} from '../../helpers/index.js';


class TSVFileWriter implements FileWriter {
  private stream: WriteStream;
  constructor(filename: string) {
    this.stream = createWriteStream(filename,{
      flags: 'w',
      encoding: DEFAULT_ENCODING,
      autoClose: true,
    });
  }

  public async write(row: string){
    const writeSuccess = this.stream.write(`${row}\n`);
    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}

export {TSVFileWriter};
