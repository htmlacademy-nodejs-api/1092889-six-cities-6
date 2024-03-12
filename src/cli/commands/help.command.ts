import {Command} from './command.interface.js';
import chalk from 'chalk';
import {injectable} from 'inversify';

@injectable()
class HelpCommand implements Command {
  get name(): string {
    return '--help';
  }

  public execute(): void {
    console.info(`
      Программа для подготовки данных для REST API сервера.
        Пример:
            ./main.cli.js --<command> [--arguments]
            или
            npm run cli --<command> [--arguments]
        Команды:
            --version:                          ${chalk.green('# выводит информации о версии приложения.')}
            --help:                             ${chalk.green('# выводит информацию о списке поддерживаемых команд.')}
            --import <path>                     ${chalk.green('# импортирует данные из TSV-файла.')}
                                                ${chalk.green('- <path> - путь и название файла Tsv')}
            --generate <n> <filepath> <url>     ${chalk.green('# генерирует произвольное количество тестовых наборов')}
                                                ${chalk.green('- <n> - количество тестовых наборов')}
                                                ${chalk.green('- <filepath> - путь и название файла Tsv')}
                                                ${chalk.green('- <url> адрес сервера с данными для генерации')}
    `);
  }
}

export {HelpCommand};
