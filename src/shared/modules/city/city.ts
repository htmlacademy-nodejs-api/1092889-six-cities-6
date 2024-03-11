import {prop} from '@typegoose/typegoose';
import {Location} from '../location/location.js';
import {City as CityInterface, CityName} from '../../types/index.js';

class City implements CityInterface {
  @prop({required: true, type: String})
    cityName: CityName;

  @prop({required: true, type: Location, _id: false})
    cityLocation: Location;
}

export {City};

