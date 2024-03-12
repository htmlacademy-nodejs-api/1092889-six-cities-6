import {defaultClasses, modelOptions, prop, PropType, Ref} from '@typegoose/typegoose';
import {Goods, ImageExtType, OfferType, City} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {Location} from '../location/location.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {

  @prop({required: true, type: String, trim: 'true'})
  public title: string;

  @prop({required:true, type: String, trim: 'true'})
  public description: string;

  @prop({required:true, type: String})
  public date: Date;

  @prop({required:true, type: String})
  public city: City;

  @prop({default:'default-offerImage.jpg',type: String})
  public previewImage: ImageExtType;

  @prop({default: '',type: () => [String], trim: true}, PropType.ARRAY)
  public images: ImageExtType[];

  @prop({required:true, type: Boolean})
  public isPremium: boolean;

  @prop({default: 0, type: Number})
  public rating: number;

  @prop({required:true, type: String, trim: true})
  public type: OfferType;

  @prop({required:true, type: Number})
  public bedrooms: number;

  @prop({required:true, type: Number})
  public maxAdults: number;

  @prop({required:true, type: Number})
  public price: number;

  @prop({required:true, type: () => [String], trim: true}, PropType.ARRAY)
  public goods: Goods[];

  @prop({required:true, ref: UserEntity})
  public authorId: Ref<UserEntity>;

  @prop({default: 0, type: Number})
  public commentCount: number;

  @prop({required: true, type: Location, _id: false})
  public location: Location;
}

