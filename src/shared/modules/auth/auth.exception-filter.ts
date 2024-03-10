import {NextFunction, Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {BaseUserException, ExceptionFilter} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';

@injectable()
class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Registering AuthExceptionFilter');
  }

  catch(error: Error, _req: Request, res: Response, next: NextFunction) {
    if(!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message
      });
  }
}

export {AuthExceptionFilter};
