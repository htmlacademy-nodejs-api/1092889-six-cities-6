import {Length, Max, Min} from 'class-validator';
import {createCommentValidationMessage} from './create-comment.message.js';

class CreateCommentDto {

  @Length(5, 1024, {message: createCommentValidationMessage.content.length})
    content: string;

  @Min(1, {message: createCommentValidationMessage.rating.min})
  @Max(5, {message: createCommentValidationMessage.rating.max})
    rating: number;

  authorId: string;

  offerId: string;
}

export {CreateCommentDto};

