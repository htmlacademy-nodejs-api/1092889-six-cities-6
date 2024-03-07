import {City, Goods, ImageExtType, Location, OfferType} from '../../../types/index.js';

class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: City;
  public previewImage?: ImageExtType;
  public images?: ImageExtType[];
  public isPremium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: Goods[];
  public commentCount?: number;
  public location?: Location;
}

export {UpdateOfferDto};
