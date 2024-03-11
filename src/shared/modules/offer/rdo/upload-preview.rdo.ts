import {Expose} from 'class-transformer';

class UploadPreviewRdo {
  @Expose()
  public previewImage: string;
}

export {UploadPreviewRdo};
