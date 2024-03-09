import {injectable} from 'inversify';
import asyncHandler from 'express-async-handler';
import {Controller} from './controller.interface.js';
import {Response, Router} from 'express';
import {Logger} from '../../logger/index.js';
import {Route} from '../types/router.interface.js';
import {StatusCodes} from 'http-status-codes';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
abstract class BaseController implements Controller {
  private readonly router: Router;

  constructor(
    protected readonly logger: Logger) {
    this.router = Router();
  }

  getRouter() {
    return this.router;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    this.router[route.method](route.path, wrapperAsyncHandler);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T) {
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T){
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T){
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T){
    this.send(res, StatusCodes.OK, data);
  }
}

export {BaseController};
