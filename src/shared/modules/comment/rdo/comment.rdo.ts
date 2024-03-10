import {Expose, Type} from 'class-transformer';
import {UserRdo} from '../../user/index.js';

class CommentRdo {
  @Expose()
  public content: string;

  @Expose({name: 'createdAt'})
  public date: string;

  @Expose()
  public rating: number;

  @Expose({name: 'authorId'})
  @Type(() => UserRdo)
  public author: string;
}

export {CommentRdo};

