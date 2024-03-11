import {inject, injectable} from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod, PrivateRouteMiddleware, UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component, ImageExtType} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {NextFunction, Request, Response} from 'express';
import {UserService} from './types/user-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../helpers/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {UserRdo} from './rdo/user.rdo.js';
import {CreateUserRequest} from './types/create-user-request.js';
import {LoginUserRequest} from './types/login-user-request.js';
import {FavoriteUserRequest} from './types/favorite-user-request.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {DocumentExistsMiddleware} from '../../libs/rest/middleware/document-exists.middleware.js';
import {OfferService} from '../offer/index.js';
import {AuthService} from '../auth/index.js';
import {LoggedUserRdo} from './rdo/logged-user.rdo.js';
import {UploadAvatarRdo} from './rdo/upload-avatar.rdo.js';

@injectable()
class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.RestConfig) private readonly config: Config<RestSchema>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.AuthService) private readonly authService: AuthService) {
    super(logger);

    this.logger.info('Register routes for UserController...');

    this.addRoute({path: '/register', method: HttpMethod.POST, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateUserDto)]});
    this.addRoute({path: '/login', method: HttpMethod.POST, handler: this.login, middlewares: [new ValidateDtoMiddleware(LoginUserDto)]});
    this.addRoute({path: '/login', method: HttpMethod.GET, handler: this.checkAuth});
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.POST,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.DELETE,
      handler: this.deleteFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.PATCH,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
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

  public async login({body}: LoginUserRequest, res: Response): Promise<void>{
    const user = await this.authService.verify(body);

    const token = await this.authService.authenticate(user);

    const responseData = fillDTO(LoggedUserRdo, {email: user.email, token});

    this.ok(res, responseData);
  }

  public async uploadAvatar({params, file, tokenPayload}: Request, res: Response): Promise<void> {
    const {userId} = params;
    if(userId !== tokenPayload.id) {
      throw new HttpError(StatusCodes.FORBIDDEN,
        'Not enough rights to modify other userId',
        'UserController');
    }
    const uploadFile = {avatar: file?.filename as ImageExtType};
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadAvatarRdo,uploadFile));
  }

  public async checkAuth({tokenPayload}: LoginUserRequest, res: Response): Promise<void> {
    const foundUser = await this.userService.findById(tokenPayload.id);

    if(!foundUser){
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }
    this.ok(res, fillDTO(UserRdo, foundUser));
  }

  public async addFavorite({params, tokenPayload}: FavoriteUserRequest, res: Response): Promise<void>{
    const {offerId} = params;
    const user = await this.userService.findById(tokenPayload.id);

    if(user!.favorites.includes(offerId)) {
      throw new HttpError(StatusCodes.CONFLICT,'Favorite offer already in favorites', 'UserController');
    }
    const updatedUser = await this.userService.updateById(tokenPayload.id, {favorites: [...user!.favorites, offerId]});
    this.created(res, fillDTO(UserRdo, updatedUser));
  }

  public async deleteFavorite({params, tokenPayload}: FavoriteUserRequest, res: Response): Promise<void>{
    const {offerId} = params;
    const user = await this.userService.findById(tokenPayload.id.toString());
    if(user?.favorites === null || (user?.favorites.length === 0)) {

      throw new HttpError(StatusCodes.NOT_FOUND,'Favorites is empty', 'UserController');
    }
    if(user!.favorites.includes(offerId)) {
      const updatedUser = await this.userService.updateById(tokenPayload.id, {favorites: [...user!.favorites.filter((id) => id !== offerId)]});
      this.noContent(res, fillDTO(UserRdo, updatedUser));
      return;
    }
    throw new HttpError(StatusCodes.NOT_FOUND,'No such offerId in favorites', 'UserController');
  }
}
export {UserController};
