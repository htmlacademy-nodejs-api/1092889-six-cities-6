import {inject, injectable} from 'inversify';
import {ExceptionFilter} from './exception-filter.interface.js';
import {Component} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {NextFunction, Request, Response} from 'express';
import {ValidationError} from '../errors/index.js';
import {createErrorObject} from '../../../helpers/index.js';
import {ApplicationError} from '../constants/application-error.constant.js';
import {StatusCodes} from 'http-status-codes';

@injectable()
class ValidationExceptionFilter implements ExceptionFilter {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public async catch(error: unknown, _req: Request, res: Response, next: NextFunction) {
    if(! (error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (field) => this.logger.warn(`[${field.property}] - ${field.messages}`));

    res.status(StatusCodes.BAD_REQUEST).json(createErrorObject(ApplicationError.VALIDATION_ERROR, error.message, error.details));
  }
}

export{ ValidationExceptionFilter };
