import {FileReader} from './file-reader.interface.js';
import {createReadStream} from 'node:fs';
import {EventEmitter} from 'node:events';
import {DEFAULT_ENCODING} from '../../helpers/index.js';

const CHUNK_SIZE = 16384;
class TSVFileReader extends EventEmitter implements FileReader{
  constructor(
    private readonly filename: string) {
    super();
  }

  public async read() {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: DEFAULT_ENCODING
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }


}

export {TSVFileReader};
