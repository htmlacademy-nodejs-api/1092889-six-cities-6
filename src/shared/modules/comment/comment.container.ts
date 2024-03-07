import {Container} from 'inversify';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity.js';
import {Component} from '../../types/index.js';
import {CommentService} from './comment-service.interface.js';
import {DefaultCommentService} from './default-comment.service.js';

const createCommentContainer = () => {
  const offerContainer = new Container();

  offerContainer.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  offerContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  return offerContainer;
};

export {createCommentContainer};
