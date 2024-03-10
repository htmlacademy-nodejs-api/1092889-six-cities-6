import {Middleware} from './middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import {Types} from 'mongoose';
import {HttpError} from '../errors/index.js';
import {StatusCodes} from 'http-status-codes';

class ValidateObjectIdMiddleware implements Middleware{
  constructor(private param: string) {}

  public execute({params}: Request, _res: Response, next: NextFunction) {
    const objectId = params[this.param];

    if(Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(StatusCodes.BAD_REQUEST, `${objectId} is invalid ObjectId`, 'ValidateObjectIdMiddleware');
  }
}

export {ValidateObjectIdMiddleware};

