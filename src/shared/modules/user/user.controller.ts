import {inject, injectable} from 'inversify';
import {BaseController, HttpError, HttpMethod} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {NextFunction, Response} from 'express';
import {UserService} from './types/user-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../helpers/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {UserRdo} from './rdo/user.rdo.js';
import {CreateUserRequest} from './types/create-user-request.js';
import {LoginUserRequest} from './types/login-user-request.js';
import {FavoriteUserRequest} from "./types/favorite-user-request.js";

@injectable()
class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/register', method: HttpMethod.POST, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.POST, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.GET, handler: this.authorize});
    this.addRoute({path: '/favorites/:offerId', method: HttpMethod.POST, handler: this.addFavorite});
    this.addRoute({path: '/favorites/:offerId', method: HttpMethod.DELETE, handler: this.deleteFavorite});
  }

  public async create({body}: CreateUserRequest, res: Response, _next: NextFunction): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with that email: ${body.email} has been already registered`,
        'UserController');
    }

    const result = await this.userService.create({...body}, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({body}: LoginUserRequest, _res: Response): Promise<void>{
    const existUser = await this.userService.findByEmail(body.email);

    if (!existUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email: ${body.email} not found`,
        'UserController');
    }

    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'UserController');
  }

  public async authorize(_req: LoginUserRequest, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'UserController');

  }

  public async addFavorite(_req: FavoriteUserRequest, _res: Response): Promise<void>{
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'UserController');

  }

  public async deleteFavorite(_req: FavoriteUserRequest, _res: Response): Promise<void>{
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'UserController');
  }
}
export {UserController};
