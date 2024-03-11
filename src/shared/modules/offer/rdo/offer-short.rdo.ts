import {Expose, Type} from 'class-transformer';
import {UserRdo} from '../../user/index.js';
import {Location} from '../../location/location.js';
import {City} from '../../../types/index.js';

class OfferShortRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose({name: 'authorId'})
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: Location;
}

export {OfferShortRdo};

