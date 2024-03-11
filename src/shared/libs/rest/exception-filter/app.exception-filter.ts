import {ExceptionFilter} from './exception-filter.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {StatusCodes} from 'http-status-codes';
import {NextFunction, Request, Response} from 'express';
import {createErrorObject} from '../../../helpers/index.js';
import {HttpError} from '../errors/index.js';
import {ApplicationError} from '../constants/application-error.constant.js';

@injectable()
class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error | HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(ApplicationError.SERVICE_ERROR, error.message));
  }
}
export {AppExceptionFilter};

