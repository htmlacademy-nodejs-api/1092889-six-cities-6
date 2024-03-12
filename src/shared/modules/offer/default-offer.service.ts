import {inject, injectable} from 'inversify';
import {OfferService} from './types/offer-service.interface.js';
import {City, Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DocumentType, mongoose, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {OFFER_IMAGES_COUNT, SortType} from '../../helpers/index.js';
import {OfferCount} from './offer.constant.js';
import {CommentService} from '../comment/index.js';
import {DefaultOffer} from './constants/offer.constant.js';

@injectable()
class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentService) private readonly commentService: CommentService) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const defaultImages = Array.from({length: OFFER_IMAGES_COUNT}, () => DefaultOffer.IMAGE);
    const result = await this.offerModel.create({...dto, previewImage: DefaultOffer.PREVIEW, images: defaultImages});
    this.logger.info(`New offer has been created title: ${result.title} id: ${result.id}`);

    return result;
  }

  public async find(limit: number): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel.aggregate([
      {
        $addFields:
          {isFavorite: false},
      },
      {
        $addFields:
          {id: {$toString: '$_id'}}
      },
      {$limit: limit}
    ]).sort({date: SortType.DOWN})
      .exec();
    return this.offerModel.populate(offers, {path: 'authorId'});
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    const offers = await this.offerModel.aggregate([
      {$match: {_id: new mongoose.Types.ObjectId(id)}},
      {
        $addFields:
          {isFavorite: false},
      },
      {
        $addFields:
          {id: {$toString: '$_id'}}
      }
    ]).sort({date: SortType.DOWN})
      .exec();
    const offer = await this.offerModel.populate(offers, {path: 'authorId'});
    return offer[0];
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
    const offers = await this.offerModel.aggregate([
      {$match: {city: city}},
      {$match: {isPremium: true}},
      {
        $addFields:
          {isFavorite: false},
      },
      {
        $addFields:
          {id: {$toString: '$_id'}}
      },
      {$limit: OfferCount.PREMIUM}
    ]).sort({date: SortType.DOWN})
      .exec();
    return this.offerModel.populate(offers, {path: 'authorId'});
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {$inc: {commentCount: 1}}).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
    return this.findById(offerId);
  }

  public async findFavorites(authorId: string): Promise<DocumentType<OfferEntity>[] | null>{
    const offers = await this.offerModel.aggregate([
      {
        $addFields:
          {id: {$toString: '$_id'}}
      },
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
            {isFavorite: {$arrayElemAt: ['$favorites.check', 0]}},
      },
      {$match: {isFavorite: true}},
      {$unset: 'favorites'},
    ]).exec();
    return this.offerModel.populate(offers, {path: 'authorId'});
  }

  public async checkOwner(offerId: string, authorId: string): Promise<boolean> {
    const offer = await this.offerModel.findById(offerId);
    return offer!.authorId.toString() === authorId;
  }

}


export {DefaultOfferService};

