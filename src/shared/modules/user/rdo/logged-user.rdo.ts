import {Expose} from 'class-transformer';

class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

}
export {LoggedUserRdo};
