import chalk from 'chalk';
import {Command} from './command.interface.js';
import {TSVFileReader} from '../../shared/libs/file-reader/index.js';
import {getErrorMessage, createOffer, getMongoURI} from '../../shared/helpers/index.js';
import {UserService} from '../../shared/modules/user/types/user-service.interface.js';
import {OfferService} from '../../shared/modules/offer/index.js';
import {DatabaseClient} from '../../shared/libs/database-client/index.js';
import {Logger} from '../../shared/libs/logger/index.js';
import {Component, Offer} from '../../shared/types/index.js';
import {DEFAULT_USER_PASSWORD} from './command.constant.js';
import {CommentService} from '../../shared/modules/comment/index.js';
import {inject, injectable} from 'inversify';
import {CliSchema, Config} from '../../shared/libs/config/index.js';

@injectable()
class ImportCommand implements Command {
  private salt: string;

  constructor(
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.CommentService) readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.DatabaseClient) readonly databaseClient: DatabaseClient,
    @inject(Component.Logger) readonly logger: Logger,
    @inject(Component.CliConfig) private readonly config: Config<CliSchema>
  ) {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
  }

  get name(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer, authorId: user.id, location: offer.location, commentCount: offer.comments
    });
  }

  public async execute(...parameters: string[]){
    const [filename] = parameters;
    const salt = this.config.get('SALT');
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_ADDRESS'),
      this.config.get('DB_PORT'),
      this.config.get('DB_PORT'));
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error: unknown) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${getErrorMessage(error)}`));
    }
  }
}

export {ImportCommand};
