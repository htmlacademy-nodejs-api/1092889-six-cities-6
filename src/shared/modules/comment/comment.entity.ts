import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {UserEntity} from '../user/index.js';
import {OfferEntity} from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true , type: String})
    content: string;

  @prop({required: true, type: String})
    date: Date;

  @prop({required: true, type: Number})
    rating: number;

  @prop({required: true, ref: UserEntity})
    authorId: string;

  @prop({required: true, ref: OfferEntity})
    offerId: string;

}

export const CommentModel = getModelForClass(CommentEntity);
