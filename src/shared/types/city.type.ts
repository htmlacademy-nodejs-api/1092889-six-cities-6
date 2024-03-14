import {Location} from './location.type.js';

type CityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

interface City {
  cityName: CityName,
  cityLocation: Location
}
export {CityName, City};
