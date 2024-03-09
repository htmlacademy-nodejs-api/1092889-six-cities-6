import {Expose} from 'class-transformer';

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
  public authorId:string;

  @Expose()
    commentsCount:number;
}


export {OfferShortRdo};

