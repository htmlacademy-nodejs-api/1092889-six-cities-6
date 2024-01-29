import {User} from './user.type.js';

type Comment = {
  content: string,
  date: Date,
  rating: number,
  author: User
}

export {Comment};
