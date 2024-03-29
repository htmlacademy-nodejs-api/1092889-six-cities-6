import {Response, Router} from 'express';
import {Route} from '../types/route.interface.js';

interface Controller {
  readonly getRouter: () => Router;
  addRoute(route: Route): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}

export {Controller};
