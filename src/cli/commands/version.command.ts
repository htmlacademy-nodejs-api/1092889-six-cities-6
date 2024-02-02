import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import chalk from 'chalk';

import {Command} from './command.interface.js';

type PackageJSONConfig = {
  version: string;
};
function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      Object.hasOwn(value, 'version')
  );
}

class VersionCommand implements Command {
  private readonly filePath = './package.json';

  private async readVersion(): Promise<string> {
    const jsonContent = await readFile(resolve(this.filePath), 'utf-8');
    const importedContent = JSON.parse(jsonContent);

    if(! isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  get name(): string {
    return '--version';
  }

  public async execute(): Promise<void> {
    try {
      const version = await this.readVersion();
      console.info(chalk.green(version));
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read version from ${this.filePath}`));

      if(error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}

export {VersionCommand};
