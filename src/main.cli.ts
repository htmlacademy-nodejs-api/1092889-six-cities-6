#!/usr/bin/env node
import 'reflect-metadata';
import {Component} from './shared/types/index.js';
import {CLIApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand} from './cli/index.js';
import {containerCliInit} from './container.cli.init.js';

const bootstrap = async () => {

  const cliContainer = containerCliInit();
  const cliApplication = cliContainer.get<CLIApplication>(Component.CliApplication);

  cliApplication.registerCommands([
    cliContainer.get<HelpCommand>(Component.HelpCommand),
    cliContainer.get<VersionCommand>(Component.VersionCommand),
    cliContainer.get<ImportCommand>(Component.ImportCommand),
    cliContainer.get<GenerateCommand>(Component.GenerateCommand),
  ]);
  cliApplication.processCommand(process.argv);
};

bootstrap();
