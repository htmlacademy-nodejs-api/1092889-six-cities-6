import {ImageExtType, UserType} from '../../../types/index.js';
import {IsEmail, IsIn, IsOptional, IsString, Length} from 'class-validator';
import {updateUserValidationMessages} from './update-user.message.js';
import {UserTypeValues} from '../../../constants/index.js';

class UpdateUserDto {

  @IsOptional()
  @Length(1,15, {message: updateUserValidationMessages.name.length})
  public name?: string;

  @IsOptional()
  @IsEmail({},{message: updateUserValidationMessages.email.invalidFormat})
  public email?: string;

  @IsOptional()
  @IsString({message: updateUserValidationMessages.avatar.invalidFormat})
  public avatar?: ImageExtType;

  @IsOptional()
  @IsIn(UserTypeValues,{message: updateUserValidationMessages.userType.invalidType})
  public type?: UserType;

  @IsOptional()
  @Length(6,12,{message: updateUserValidationMessages.password.length})
  public favorites?: string[];
}

export {UpdateUserDto};

