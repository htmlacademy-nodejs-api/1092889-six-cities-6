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
import {DefaultOffer} from './constants/offer.constant.js';

@injectable()
class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentService) private readonly commentService: CommentService) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const defaultImages = Array.from({length: 6}, () => DefaultOffer.IMAGE);
    const result = await this.offerModel.create({...dto, previewImage: DefaultOffer.PREVIEW, images: defaultImages});
    this.logger.info(`New offer has been created title: ${result.title} id: ${result.id}`);

    return result;
  }


  public async find(limit: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate('authorId').limit(limit).sort({date: SortType.DOWN}).exec();
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
            {$project: {id: 1, name: 1, avatar: 1, type: 1, check: 1}}],
          as: 'favorites'
        }},
      {
        $addFields:
            {isFavorite: {$arrayElemAt: ['$favorites.check', 0]}},
      },
      {
        $addFields:
          {authorId: {$arrayElemAt: ['$favorites', 0]}}
      },
      {$match: {isFavorite: true}},
      {$unset: 'favorites'},
    ]).exec();
  }

  public async checkOwner(offerId: string, authorId: string): Promise<boolean> {
    const offer = await this.offerModel.findById(offerId);
    return offer!.authorId.toString() === authorId;
  }

}


export {DefaultOfferService};

