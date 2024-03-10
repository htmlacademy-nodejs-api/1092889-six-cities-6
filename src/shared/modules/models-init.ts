import {getModelForClass} from '@typegoose/typegoose';
import {UserEntity} from './user/index.js';
import {OfferEntity} from './offer/index.js';
import {CommentEntity} from './comment/index.js';

const UserModel = getModelForClass(UserEntity);
const OfferModel = getModelForClass(OfferEntity);
const CommentModel = getModelForClass(CommentEntity);

export {UserModel, OfferModel, CommentModel};
