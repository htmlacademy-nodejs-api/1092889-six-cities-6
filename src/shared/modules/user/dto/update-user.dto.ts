import {ImageExtType, UserType} from '../../../types/index.js';

class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatar?: ImageExtType;
  public type?: UserType;
  public favorites?: string[];
}

export {UpdateUserDto};

