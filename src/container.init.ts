import {Container} from 'inversify';
import {createRestApplicationContainer} from './rest/container.js';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';
import {createCommentContainer} from './shared/modules/comment/index.js';
import {createAuthContainer} from './shared/modules/auth/index.js';

const containerInit = () => Container.merge(
  createRestApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer(),
  createAuthContainer());

export {containerInit};
