import {Expose, Type} from 'class-transformer';
import {Goods, ImageExtType, Location} from '../../../types/index.js';
import {UserRdo} from '../../user/index.js';

class OfferDetailedRdo {
  @Expose()
  public id:string;

  @Expose()
  public title:string;

  @Expose()
  public description:string;

  @Expose()
  public date:string;

  @Expose()
  public city:string;

  @Expose()
  public previewImage:string;

  @Expose()
  public images: ImageExtType[];

  @Expose()
  public isPremium:boolean;

  @Expose()
  public isFavorite:boolean;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public rating:number;

  @Expose()
  public type:string;

  @Expose()
  public price:number;

  @Expose()
  public goods: Goods[];

  @Expose()
  @Type(() => UserRdo)
  public authorId: UserRdo;

  @Expose()
  public commentCount:number;

  @Expose()
  public location: Location;
}


export {OfferDetailedRdo};
