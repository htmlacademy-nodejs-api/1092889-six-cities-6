import {NextFunction, Request, Response} from 'express';
import {jwtVerify} from 'jose';
import {StatusCodes} from 'http-status-codes';
import {createSecretKey} from 'node:crypto';
import {TokenPayload} from '../../../modules/auth/index.js';
import {Middleware} from './middleware.interface.js';
import {HttpError} from '../errors/index.js';

const isTokenPayload = (payload: unknown): payload is TokenPayload => (
  (typeof payload === 'object' && payload !== null) &&
    ('id' in payload && typeof payload.id === 'string') &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('type' in payload && typeof payload.type === 'string')
);

class ParseJwtTokenMiddleware implements Middleware {

  constructor(private readonly jwtSecret: string) {}

  public async execute (req: Request, _res: Response, next: NextFunction) {
    const authorizationHeader = req.headers?.authorization?.split(' ');

    if(!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const {payload} = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if(isTokenPayload(payload)) {
        req.tokenPayload = {...payload};
        return next();
      } else {
        throw new Error('Bad token');
      }
    } catch {

      return next(
        new HttpError(
          StatusCodes.UNAUTHORIZED,
          'Invalid token',
          'AuthenticationMiddleware'
        ));
    }
  }
}

export {ParseJwtTokenMiddleware};
