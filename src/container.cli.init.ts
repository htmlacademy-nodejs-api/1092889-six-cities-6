import {Container} from 'inversify';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';
import {createCommentContainer} from './shared/modules/comment/index.js';
import {createCliApplicationContainer} from './cli/container.js';

const containerCliInit = () => Container.merge(
  createCliApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer());

export {containerCliInit};
