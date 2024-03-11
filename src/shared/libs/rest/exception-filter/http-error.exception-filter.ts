import {ExceptionFilter} from './exception-filter.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {NextFunction, Request, Response} from 'express';
import {HttpError} from '../errors/index.js';
import {createErrorObject} from '../../../helpers/index.js';
import {ApplicationError} from '../constants/application-error.constant.js';

@injectable()
class HttpErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ){
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public async catch(error: unknown, req: Request, res: Response, next: NextFunction) {
    if(!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res.status(error.httpStatusCode).json(createErrorObject(ApplicationError.COMMON_ERROR, error.message));
  }
}

export {HttpErrorExceptionFilter};

