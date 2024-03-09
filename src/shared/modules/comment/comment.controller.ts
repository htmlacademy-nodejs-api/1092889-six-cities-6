import {inject, injectable} from 'inversify';
import {BaseController, HttpError, HttpMethod} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

@injectable()
class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({path: '/:offerId', method: HttpMethod.GET, handler: this.index});
    this.addRoute({path: '/:offerId', method: HttpMethod.POST, handler: this.create});
  }

  public index(_req: Request, _res: Response): void {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'CommentController');

  }

  public create(_req: Request, _res: Response): void {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'CommentController');

  }
}

export {CommentController};
