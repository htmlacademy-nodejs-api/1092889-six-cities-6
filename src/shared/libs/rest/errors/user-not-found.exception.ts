import {BaseUserException} from './base-user.exception.js';
import {StatusCodes} from 'http-status-codes';

class UserNotFoundException extends BaseUserException {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'User not found');
  }
}

export {UserNotFoundException};

