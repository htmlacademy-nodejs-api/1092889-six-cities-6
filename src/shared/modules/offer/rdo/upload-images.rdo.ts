import {Expose} from 'class-transformer';

class UploadImagesRdo {
  @Expose()
  public images: string[];
}

export {UploadImagesRdo};
