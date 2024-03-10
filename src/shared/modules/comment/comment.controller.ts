import {inject, injectable} from 'inversify';
import {BaseController, HttpMethod, ValidateDtoMiddleware} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {CreateCommentRequest} from './types/create-comment-request.js';
import {CommentService} from './comment-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {ParamOfferId} from '../../types/param-offerid.type.js';
import {OfferService} from '../offer/index.js';
import {ValidateObjectIdMiddleware} from '../../libs/rest/index.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {DocumentExistsMiddleware} from '../../libs/rest/middleware/document-exists.middleware.js';

@injectable()
class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.GET,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create({params, body}: CreateCommentRequest, res: Response): Promise<void> {
    const {offerId} = params;
    const comment = await this.commentService.create({...body, offerId});
    await this.offerService.incCommentCount(comment.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async index({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const {offerId} = params;
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}

export {CommentController};
