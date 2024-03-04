import {ImageExtType, UserType} from '../../../types/index.js';

class CreateUserDto {
  public name: string;
  public email: string;
  public avatar: ImageExtType;
  public type: UserType;
  public password: string;
}

export {CreateUserDto};
