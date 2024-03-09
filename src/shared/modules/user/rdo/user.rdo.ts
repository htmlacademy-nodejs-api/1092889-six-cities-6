import {Expose} from 'class-transformer';
import {ImageExtType, UserType} from '../../../types/index.js';

class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: ImageExtType;

  @Expose()
  public type: UserType;
}


export {UserRdo};

