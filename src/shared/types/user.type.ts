import {ImageExtType} from './common.type.js';

type UserType = 'regular' | 'pro'

type User = {
  name: string,
  email: string,
  avatar: ImageExtType
  type: UserType
}

export {User, UserType};

