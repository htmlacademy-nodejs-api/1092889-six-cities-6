import {BaseUserException} from './base-user.exception.js';
import {StatusCodes} from 'http-status-codes';

class UserIncorrectPasswordException extends BaseUserException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect username or password');
  }
}

export {UserIncorrectPasswordException};
