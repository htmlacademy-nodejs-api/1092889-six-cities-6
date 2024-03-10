import {IsEmail, Length} from 'class-validator';
import {loginUserValidationMessages} from './login-user.messages.js';

class LoginUserDto {
  @IsEmail({},{message: loginUserValidationMessages.email.invalidFormat})
  public email: string;

  @Length(6,12,{message: loginUserValidationMessages.password.length})
  public password: string;
}

export {LoginUserDto};
