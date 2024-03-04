import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {Goods, ImageExtType, Location, Offer, OfferType, User, City} from '../../types/index.js';
import {UserEntity} from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {

  @prop({required: true, type: String, trim: 'true'})
  public title: string;

  @prop({required:true, type: String, trim: 'true'})
  public description: string;

  @prop({required:true, type: String})
  public date: Date;

  @prop({required:true, type: String})
  public city: City;

  @prop({required:true, type: String})
  public previewImage: ImageExtType;

  @prop({required:true, type: String})
  public images: ImageExtType[];

  @prop({required:true, type: Boolean})
  public isPremium: boolean;

  @prop({required:true, type: Boolean})
  public isFavorite: boolean;

  @prop({required:true, type: Number})
  public rating: number;

  @prop({required:true, type: String})
  public type: OfferType;

  @prop({required:true, type: Number})
  public bedrooms: number;

  @prop({required:true, type: Number})
  public maxAdults: number;

  @prop({required:true, type: Number})
  public price: number;

  @prop({required:true, type: String})
  public goods: Goods[];

  @prop({required:true,ref: UserEntity})
  public author: Omit<User, 'password'>;

  @prop({required:true, default: 0, type: Number})
  public comments: number;

  @prop({set: (value: Location) => JSON.stringify(value), get: (value: string) => JSON.parse(value) ,default: '', type: String})
  public location: Location;

}

export const OfferModel = getModelForClass(OfferEntity);
