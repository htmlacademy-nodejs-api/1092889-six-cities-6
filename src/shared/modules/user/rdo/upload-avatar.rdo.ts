import {Expose} from 'class-transformer';

class UploadAvatarRdo {
  @Expose()
  public avatar: string;
}

export {UploadAvatarRdo};
