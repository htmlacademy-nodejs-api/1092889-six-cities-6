import {Expose, Type} from 'class-transformer';
import {City, Goods, ImageExtType, Location} from '../../../types/index.js';
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
  public city:City;

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

  @Expose({name: 'authorId'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentCount:number;

  @Expose()
  public location: Location;
}


export {OfferDetailedRdo};
