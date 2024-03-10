import {inject, injectable} from 'inversify';
import {OfferService} from './types/offer-service.interface.js';
import {City, Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DocumentType, mongoose, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {SortType} from '../../helpers/index.js';
import {OfferCount} from './offer.constant.js';
import {CommentService} from '../comment/index.js';

@injectable()
class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentService) private readonly commentService: CommentService) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer has been created title: ${result.title} id: ${result.id}`);

    return result;
  }


  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate('authorId').limit(OfferCount.DEFAULT).sort({date: SortType.DOWN}).exec();
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).populate('authorId').exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndDelete(offerId).exec();
    await this.commentService.deleteByOfferId(offerId);
    return result;
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId}) !== null);
  }

  public async findPremiumByCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city}, {} , {limit: OfferCount.PREMIUM})
      .sort({date: SortType.DOWN})
      .populate('authorId')
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {$inc: {commentCount: 1}}).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async findFavorites(authorId: string): Promise<DocumentType<OfferEntity>[]>{
    return this.offerModel.aggregate([
      {$match: {isFavorite: true}},
      {$addFields:{isFavorite: false}},
      {
        $lookup: {
          from: 'users',
          let: {id: '$_id'},
          pipeline:[
            {$match: {_id: new mongoose.Types.ObjectId(authorId)}},
            {$addFields: {
              check: {$in: [{$toString: '$$id'}, '$favorites']}
            },
            },
            {$project: {_id: 1, name: 1, avatar: 1, type: 1, check: 1}}],
          as: 'favorites'
        }},
      {
        $addFields:
            {isFavorite: {$arrayElemAt: ['$favorites.check', 0]}}
      },
      {
        $addFields:
          {author: '$favorites'}
      },
      {$match: {isFavorite: true}},
      {$unset: 'favorites'},
      {$unset: 'author.check'}
    ]).exec();
  }

  public async updateCommentsCount(offerId: string): Promise<DocumentType<Pick<OfferEntity, 'commentCount'>>> {
    const result = await this.offerModel.aggregate([
      {$match: {_id: new mongoose.Types.ObjectId(offerId)}},
      {
        $lookup: {
          from: 'comments',
          let: {id: offerId},
          pipeline: [
            {$match: {$match: { $expr: { $in: ['$$id', '$offerId']}}}},
            {$project: {_id: 1}}],
          as: 'comments'
        }},
      {
        $addFields:
        {commentsCount: {$size: ['$comments']}}
      },
      {$unset: 'comments'},
      {$project: {commentsCount: 1}}
    ]).exec();
    if(result.length!) {
      throw new Error('Not valid commentCount');
    }
    return result[0];
  }

  public async updateRating(offerId: string): Promise<DocumentType<Pick<OfferEntity, 'rating'>>> {
    const result = await this.offerModel.aggregate([
      {$match: {_id: new mongoose.Types.ObjectId(offerId)}},
      {
        $lookup: {
          from: 'comments',
          let: {id: offerId},
          pipeline: [
            {$match: {$match: { $expr: { $in: ['$$id', '$offerId']}}}},
            {$project: {rating: 1}}],
          as: 'comments'
        }},
      {
        $addFields:
        {commentsCount: {$avg: ['$comments.rating', '$commentsCount']}}
      },
      {$unset: 'comments'},
      {$project: {rating: 1}}
    ]).exec();
    if(result.length!) {
      throw new Error('Not valid rating');
    }
    return result[0];
  }
}


export {DefaultOfferService};

