import {inject, injectable} from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {City, Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {OfferService} from './types/offer-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {OfferShortRdo} from './rdo/offer-short.rdo.js';
import {StatusCodes} from 'http-status-codes';
import {CreateOfferRequest} from './types/create-offer-request.js';
import {UpdateOfferRequest} from './types/update-offer-request.js';
import {ParamOfferId} from '../../types/param-offerid.type.js';
import {OfferDetailedRdo} from './rdo/offer-detailed.rdo.js';
import {RequestQuery} from './types/request-querry.type.js';
import {ValidateDtoMiddleware} from '../../libs/rest/index.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {DocumentExistsMiddleware} from '../../libs/rest/middleware/document-exists.middleware.js';

@injectable()
class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.GET, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.POST, handler: this.create, middlewares:[
      new PrivateRouteMiddleware(),
      new ValidateDtoMiddleware(CreateOfferDto)]});
    this.addRoute({path: '/premium', method: HttpMethod.GET, handler: this.getPremium});
    this.addRoute({path: '/favorites', method: HttpMethod.GET, handler: this.getFavorites, middlewares: [new PrivateRouteMiddleware()]});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.GET,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.PATCH,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.DELETE,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferShortRdo, offers));
  }

  public async create({body, tokenPayload}: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({...body, authorId: tokenPayload.id});
    const offer = await this.offerService.findById(result.id);

    this.created(res, fillDTO(OfferDetailedRdo, offer));
  }

  public async show({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferDetailedRdo, offer));
  }

  public async update({params, body, tokenPayload}: UpdateOfferRequest, res: Response): Promise<void> {
    const {offerId} = params;
    const existingOffer = await this.offerService.findById(offerId);

    if(!existingOffer!.authorId === tokenPayload.id) {
      new HttpError(StatusCodes.FORBIDDEN, 'Permissions required', 'OfferController');
    }
    const offer = await this.offerService.updateById(offerId,body);

    this.ok(res, fillDTO(OfferDetailedRdo, offer));
  }

  public async delete({params, tokenPayload}: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    const existingOffer = await this.offerService.findById(offerId);

    if(!existingOffer!.authorId === tokenPayload.id) {
      new HttpError(StatusCodes.FORBIDDEN, 'Permissions required', 'OfferController');
    }

    const offer = await this.offerService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async getPremium({query}: Request<unknown,unknown,unknown,RequestQuery>, res: Response): Promise<void> {
    if(!query.city){
      throw new HttpError(StatusCodes.BAD_REQUEST, 'City is not provided', 'OfferController');
    }
    const offers = await this.offerService.findPremiumByCity(query.city as City);

    this.ok(res, fillDTO(OfferShortRdo, offers));
  }

  public async getFavorites({tokenPayload}: Request, res: Response): Promise<void> {
    const result = this.offerService.findFavorites(tokenPayload.id);

    this.ok(res, fillDTO(OfferShortRdo, result));
  }

}

export {OfferController};
