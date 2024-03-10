import {Middleware} from './middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import {HttpError} from '../errors/index.js';
import {StatusCodes} from 'http-status-codes';
import {DocumentExists} from '../../../types/index.js';

class DocumentExistsMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentExists,
    private readonly entityName: string,
    private readonly paramName: string
  ){}

  public async execute({params}: Request, _res: Response, next: NextFunction) {
    const documentId = params[this.paramName];

    if(! await this.service.exists(documentId)) {
      throw new HttpError(StatusCodes.NOT_FOUND, `${this.entityName} with ${documentId} not found`, 'DocumentExistsMiddleware');
    }

    next();
  }
}

export {DocumentExistsMiddleware};
