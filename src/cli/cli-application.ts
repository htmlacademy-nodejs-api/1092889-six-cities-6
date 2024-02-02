import {Command} from './commands/command.interface.js';
import {CommandParser} from './command-parser.js';

type CommandCollection = Record<string, Command>;

class CLIApplication {
  private commands: CommandCollection = {};
  private readonly defaultCommandName = '--help';

  public registerCommands(commandList: Command[]): void {
    this.commands = commandList.reduce((acc: CommandCollection, command) => {
      if(this.commands[command.name]) {
        throw new Error(`Command ${command.name} is already registered`);
      }
      acc[command.name] = command;
      return acc;
    }, {});
  }

  get defaultCommand(): Command | never {
    if(! this.commands[this.defaultCommandName]) {
      throw new Error(`The default command (${this.defaultCommandName}) is not registered`);
    }
    return this.commands[this.defaultCommandName];
  }

  public getCommand = (commandName: string): Command => this.commands[commandName] ?? this.defaultCommand;

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}

export {CLIApplication};
