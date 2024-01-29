import {ImageExtType} from './common.type.js';

type UserType = 'regular' | 'pro'

type User = {
  name: string,
  email: string,
  avatar?: ImageExtType
  password: string,
  type: UserType
}

export {User, UserType};

