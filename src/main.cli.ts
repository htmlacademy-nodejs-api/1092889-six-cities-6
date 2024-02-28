#!/usr/bin/env node
import {readdir} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

import {CLIApplication} from './cli/index.js';
import {Command} from './cli/commands/command.interface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commandsDirectory = resolve(__dirname,'cli','commands');

const bootstrap = async () => {
  const files = await readdir(commandsDirectory);
  const commandFiles = files.filter((fileName) => fileName.endsWith('command.js'));
  const commands: Command[] = [];

  for (const file of commandFiles) {
    const modulePath = resolve(commandsDirectory,file);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const commandModule = await import(modulePath);

    const moduleName = Object.keys(commandModule).find((key) =>
      commandModule[key].prototype && typeof commandModule[key].prototype.execute === 'function');

    if(typeof moduleName === 'undefined') {
      throw new Error(`Couldn't find CommandClass in ${modulePath}`);
    }else {
      const CommandClass = commandModule[moduleName];
      commands.push(new CommandClass());
    }
  }

  const cliApplication = new CLIApplication();
  cliApplication.registerCommands(commands);

  cliApplication.processCommand(process.argv);
};

bootstrap();
