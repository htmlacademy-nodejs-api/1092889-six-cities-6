import {inject, injectable} from 'inversify';
import {BaseController, HttpError, HttpMethod} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {OfferService} from './types/offer-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {OfferShortRdo} from './rdo/offer-short.rdo.js';
import {StatusCodes} from 'http-status-codes';
import {CreateOfferRequest} from './types/create-offer-request.js';
import {UpdateOfferRequest} from './types/update-offer-request.js';

@injectable()
class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.GET, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.POST, handler: this.create});
    this.addRoute({path: '/:id', method: HttpMethod.GET, handler: this.getOffer});
    this.addRoute({path: '/:id', method: HttpMethod.PATCH, handler: this.updateOffer});
    this.addRoute({path: '/:id', method: HttpMethod.DELETE, handler: this.deleteOffer});
    this.addRoute({path: '/premium', method: HttpMethod.GET, handler: this.getPremium});
    this.addRoute({path: '/favorites', method: HttpMethod.GET, handler: this.getFavorites});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferShortRdo, offers);
    this.ok(res, responseData);
  }

  public async create(_req: CreateOfferRequest, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'OfferController');
  }

  public async getOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'OfferController');
  }

  public async updateOffer(_req: UpdateOfferRequest, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'OfferController');
  }

  public async deleteOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'OfferController');
  }

  public async getPremium(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'OfferController');
  }

  public async getFavorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'not implemented', 'OfferController');
  }

}

export {OfferController};
