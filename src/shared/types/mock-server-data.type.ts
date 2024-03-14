import {Location} from './location.type.js';
import {City} from './city.type.js';


type MockServerData = {
  titles: string[],
  descriptions: string[],
  cities: City[],
  previewImages: string[],
  offerImages: string[],
  types: string[],
  goods: string[],
  userNames: string[]
  locations: Location[],
  emails: string[],
  avatars: string[],
  userTypes: string[]
}

export {MockServerData};
