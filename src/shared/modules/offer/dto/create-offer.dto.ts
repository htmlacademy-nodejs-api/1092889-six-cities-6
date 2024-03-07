import {Goods, ImageExtType, Location, OfferType, User, City} from '../../../types/index.js';

class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: City;
  public previewImage: ImageExtType;
  public images: ImageExtType[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: Goods[];
  public authorId: Omit<User, 'password'>;
  public commentCount: number;
  public location: Location;
}

export {CreateOfferDto};

