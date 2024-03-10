import {City, Goods, ImageExtType, Location, OfferType} from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn, IsOptional,
  IsString,
  Length,
  Max,
  Min
} from 'class-validator';
import {Cities, OfferTypes} from '../../../constants/index.js';
import {updateOfferValidationMessage} from './update-offer.message.js';

class UpdateOfferDto {

    @IsOptional()
  @Length(10,100, {message: updateOfferValidationMessage.title.length })
  public title?: string;

  @IsOptional()
  @Length(20,1024, {message: updateOfferValidationMessage.description.length })
    public description?: string;

  @IsOptional()
  @IsDateString({},{message: updateOfferValidationMessage.date.invalidFormat })
  public date?: Date;

  @IsOptional()
  @IsIn(Cities, {message: updateOfferValidationMessage.city.invalidCity })
  public city?: City;

  @IsOptional()
  @IsString({message: updateOfferValidationMessage.previewImage.invalidFormat })
  public previewImage?: ImageExtType;

  @IsOptional()
  @ArrayMinSize(6,{message: updateOfferValidationMessage.images.invalidImages })
  @ArrayMaxSize(6,{message: updateOfferValidationMessage.images.invalidImages })
  public images?: ImageExtType[];

  @IsOptional()
  @IsBoolean({message: updateOfferValidationMessage.isPremium.notBoolean })
  public isPremium?: boolean;

  @IsOptional()
  @Min(1, {message: updateOfferValidationMessage.rating.min })
  @Max(5, {message: updateOfferValidationMessage.rating.max })
  public rating?: number;

  @IsOptional()
  @IsIn(OfferTypes, {message: updateOfferValidationMessage.type.invalidType })
  public type?: OfferType;

  @IsOptional()
  @Min(1, {message: updateOfferValidationMessage.bedrooms.min })
  @Max(8, {message: updateOfferValidationMessage.bedrooms.max })
  public bedrooms?: number;

  @IsOptional()
  @Min(1, {message: updateOfferValidationMessage.maxAdults.min })
  @Max(10, {message: updateOfferValidationMessage.maxAdults.max })
  public maxAdults?: number;

  @IsOptional()
  @Min(100, {message: updateOfferValidationMessage.price.min })
  @Max(100000, {message: updateOfferValidationMessage.price.max })
  public price?: number;

  @IsOptional()
  @IsArray({message: updateOfferValidationMessage.goods.notArray})
  @ArrayMinSize(1, {message: updateOfferValidationMessage.goods.empty })
  public goods?: Goods[];

  @IsOptional()
  public commentCount?: number;

  @IsOptional()
  public location?: Location;

}

export {UpdateOfferDto};
