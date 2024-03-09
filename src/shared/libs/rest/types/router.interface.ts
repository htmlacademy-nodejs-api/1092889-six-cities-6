import {HttpMethod} from './http-method.enum.js';
import {NextFunction, Request, Response} from 'express';

interface Route {
  path: string,
  method: HttpMethod,
  handler: (req: Request, res: Response, next: NextFunction) => void
}

export {Route};

