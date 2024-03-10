import {inject, injectable} from 'inversify';
import {CommentService} from './comment-service.interface.js';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {DEFAULT_OFFERS_COUNT} from './comment.constants.js';
import {SortType} from '../../helpers/index.js';

@injectable()
class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>) {
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment has been created content: ${result.content} id: ${result.id}`);

    return result;
  }

  public async findByOfferId(id: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId: id}).populate('authorId').limit(DEFAULT_OFFERS_COUNT).sort({createdAT: SortType.DOWN}).exec();
  }

  public async deleteByOfferId(id: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId: id})
      .exec();

    return result.deletedCount;
  }
}

export {DefaultCommentService};
