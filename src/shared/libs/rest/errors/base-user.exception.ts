import {HttpError} from './http-error.js';

class BaseUserException extends HttpError {
  constructor(httpStatusCode: number, message: string){
    super(httpStatusCode, message);
  }
}

export {BaseUserException};
