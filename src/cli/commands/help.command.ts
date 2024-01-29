import {Command} from './command.interface.js';
import chalk from 'chalk';

class HelpCommand implements Command {
  get name(): string {
    return '--help';
  }

  public execute(): void {
    console.info(`
      Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   ${chalk.green('# выводит информации о версии приложения.')}
            --help:                      ${chalk.green('# выводит информацию о списке поддерживаемых команд.')}
            --import <path>:             ${chalk.green('# импортирует данные из TSV-файла.')}
    `);
  }
}

export {HelpCommand};