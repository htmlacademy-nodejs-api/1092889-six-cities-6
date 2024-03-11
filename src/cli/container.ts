import {Container} from 'inversify';
import {Component} from '../shared/types/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {CLIApplication} from './cli-application.js';
import {ImportCommand} from './commands/import.command.js';
import {HelpCommand} from './commands/help.command.js';
import {VersionCommand} from './commands/version.command.js';
import {GenerateCommand} from './commands/generate.command.js';
import {CliConfig, CliSchema, Config} from '../shared/libs/config/index.js';

const createCliApplicationContainer = () => {
  const container = new Container();

  container.bind<CLIApplication>(Component.CliApplication).to(CLIApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<CliSchema>>(Component.CliConfig).to(CliConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<ImportCommand>(Component.ImportCommand).to(ImportCommand).inSingletonScope();
  container.bind<HelpCommand>(Component.HelpCommand).to(HelpCommand).inSingletonScope();
  container.bind<VersionCommand>(Component.VersionCommand).to(VersionCommand).inSingletonScope();
  container.bind<GenerateCommand>(Component.GenerateCommand).to(GenerateCommand).inSingletonScope();

  return container;
};

export {createCliApplicationContainer};
