import {inject, injectable} from 'inversify';
import express, {Express} from 'express';
import cors from 'cors';
import {Logger} from '../shared/libs/logger/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Component} from '../shared/types/index.js';
import {DatabaseClient} from '../shared/libs/database-client/index.js';
import {getFullServerPath, getMongoURI} from '../shared/helpers/index.js';
import {Controller, ExceptionFilter, ParseJwtTokenMiddleware, FilesDirectoryRoute} from '../shared/libs/rest/index.js';


@injectable()
class Application {
  private readonly server: Express;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RestConfig) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_ADDRESS'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/user', this.userController.getRouter());
    this.server.use('/offer', this.offerController.getRouter());
    this.server.use('/comment', this.commentController.getRouter());
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseJwtTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use(FilesDirectoryRoute.UPLOAD, express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(FilesDirectoryRoute.STATIC, express.static(this.config.get('STATIC_DIRECTORY')));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilter() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`The PORT value from env is ${this.config.get('PORT')}`);

    this.logger.info('Initializing database');
    await this.initDb();
    this.logger.info('Initializing database has been completed');

    this.logger.info('Initializing app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware has been initialized');

    this.logger.info('Initializing controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Initializing exception filters');
    await this.initExceptionFilter();
    this.logger.info('Exception filters has been initialized');

    this.logger.info('Try to initialize server...');
    await this.initServer();
    this.logger.info(`Server started on: ${getFullServerPath(this.config.get('HOST'),this.config.get('PORT'))}`);
  }
}

export {Application};

