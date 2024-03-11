import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn, IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';
import {Goods, ImageExtType, Location, OfferType, City} from '../../../types/index.js';
import {Cities, OfferGoods, OfferTypes} from '../../../constants/index.js';
import {createOfferValidationMessage} from './create-offer.messages.js';

class CreateOfferDto {
  @Length(10,100, {message: createOfferValidationMessage.title.length })
  public title: string;

  @Length(20,1024, {message: createOfferValidationMessage.description.length })
  public description: string;

  @IsDateString({},{message: createOfferValidationMessage.date.invalidFormat })
  public date: Date;

  @IsIn(Cities, {message: createOfferValidationMessage.city.invalidCity })
  public city: City;

  @IsOptional()
  public previewImage: ImageExtType;

  @IsOptional()
  public images: ImageExtType[];

  @IsBoolean({message: createOfferValidationMessage.isPremium.notBoolean })
  public isPremium: boolean;

  @Min(1, {message: createOfferValidationMessage.rating.min })
  @Max(5, {message: createOfferValidationMessage.rating.max })
  public rating: number;

  @IsIn(OfferTypes, {message: createOfferValidationMessage.type.invalidType })
  public type: OfferType;

  @Min(1, {message: createOfferValidationMessage.bedrooms.min })
  @Max(8, {message: createOfferValidationMessage.bedrooms.max })
  public bedrooms: number;

  @Min(1, {message: createOfferValidationMessage.maxAdults.min })
  @Max(10, {message: createOfferValidationMessage.maxAdults.max })
  public maxAdults: number;

  @Min(100, {message: createOfferValidationMessage.price.min })
  @Max(100000, {message: createOfferValidationMessage.price.max })
  public price: number;

  @IsArray({message: createOfferValidationMessage.goods.notArray})
  @ArrayMinSize(1, {message: createOfferValidationMessage.goods.empty })
  @IsIn(OfferGoods, {each: true, message: createOfferValidationMessage.goods.invalid })
  public goods: Goods[];

  public authorId: string;

  public commentCount: number;

  public location: Location;
}

export {CreateOfferDto};

