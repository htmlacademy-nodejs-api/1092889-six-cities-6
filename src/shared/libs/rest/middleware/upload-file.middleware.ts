import {NextFunction, Request, Response} from 'express';
import multer, {diskStorage} from 'multer';
import {extension} from 'mime-types';
import {nanoid} from 'nanoid';
import {Middleware} from './middleware.interface.js';

class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    private multiple: boolean = false
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction) {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename:(_req, file, callback) => {
        const fileExtension = extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${fileExtension}`);
      }
    });

    if(this.multiple) {
      const uploadMultipleFilesMiddleware = multer({storage}).array(this.fieldName, 6);
      uploadMultipleFilesMiddleware(req, res, next);
      return;
    }

    const uploadSingleFileMiddleware = multer({storage}).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}

export {UploadFileMiddleware};
