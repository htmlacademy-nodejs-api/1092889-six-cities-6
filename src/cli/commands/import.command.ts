import chalk from 'chalk';
import {Command} from './command.interface.js';
import {TSVFileReader} from '../../shared/libs/file-reader/index.js';
import {getErrorMessage, createOffer, getMongoURI} from '../../shared/helpers/index.js';
import {UserService} from '../../shared/modules/user/types/user-service.interface.js';
import {DefaultOfferService, OfferService} from '../../shared/modules/offer/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../../shared/libs/database-client/index.js';
import {ConsoleLogger, Logger} from '../../shared/libs/logger/index.js';
import {DefaultUserService, } from '../../shared/modules/user/index.js';
import {Offer} from '../../shared/types/index.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './command.constant.js';
import {CommentModel, OfferModel, UserModel} from '../../shared/modules/models-init.js';
import {CommentService, DefaultCommentService} from '../../shared/modules/comment/index.js';

class ImportCommand implements Command {
  private readonly userService: UserService;
  private readonly offerService: OfferService;
  private readonly commentService: CommentService;
  private readonly databaseClient: DatabaseClient;
  private readonly logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.commentService = new DefaultCommentService(this.logger, CommentModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel, this.commentService);
    this.databaseClient = new MongoDatabaseClient(this.logger);
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
    const [filename, login, password, host, dbname, salt] = parameters;
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
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
