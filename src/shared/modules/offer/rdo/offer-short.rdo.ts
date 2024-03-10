import {Expose, Type} from 'class-transformer';
import {UserRdo} from '../../user/index.js';

class OfferShortRdo {
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
  public isPremium:boolean;

  @Expose()
  public isFavorite:boolean;

  @Expose()
  public rating:number;

  @Expose()
  public type:string;

  @Expose()
  public price:number;

  @Expose()
  @Type(() => UserRdo)
  public authorId: UserRdo;

  @Expose()
    commentsCount:number;
}


export {OfferShortRdo};

