import {Location as LocationInterface} from '../../types/index.js';
import {prop} from '@typegoose/typegoose';

class Location implements LocationInterface {
  @prop({required: true, type: Number})
    latitude: number;

  @prop({required: true, type: Number})
    longitude: number;
}

export {Location};

