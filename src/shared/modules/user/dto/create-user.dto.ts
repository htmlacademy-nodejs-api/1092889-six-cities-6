import {ImageExtType, UserType} from '../../../types/index.js';
import {IsEmail, IsIn, IsOptional, IsString, Length} from 'class-validator';
import {createUserValidationMessages} from './create-user.messages.js';
import {UserTypeValues} from '../../../constants/index.js';

class CreateUserDto {
  @Length(1,15, {message: createUserValidationMessages.name.length})
  public name: string;

  @IsEmail({},{message: createUserValidationMessages.email.invalidFormat})
  public email: string;

  @IsOptional()
  @IsString({message: createUserValidationMessages.avatar.invalidFormat})
  public avatar: ImageExtType;

  @IsIn(UserTypeValues,{message: createUserValidationMessages.userType.invalidType})
  public type: UserType;

  @Length(6,12,{message: createUserValidationMessages.password.length})
  public password: string;
}

export {CreateUserDto};
