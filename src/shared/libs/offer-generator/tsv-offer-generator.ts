import dayjs from 'dayjs';
import {OfferGenerator} from './offer-generator.interface.js';
import {City, Location, MockServerData} from '../../types/index.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
  generateRandomBoolean,
  OFFER_IMAGES_COUNT
} from '../../helpers/index.js';

const enum Price {
  MIN = 100,
  MAX = 100000
}

const enum Rooms {
  MIN = 1,
  MAX = 8
}

const enum MaxAdults {
  MIN = 1,
  MAX = 10
}

const enum CommentsLength {
  MIN = 1,
  MAX = 20
}

const enum Rating {
  MIN = 1,
  MAX = 5
}

const enum WeekDay {
  FIRST = 1,
  LAST = 7
}

class TSVOfferGenerator implements OfferGenerator{
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(WeekDay.FIRST, WeekDay.LAST), 'day')
      .toISOString();
    const city = getRandomItem<City>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const offerImages = Array.from({length:OFFER_IMAGES_COUNT}, () => getRandomItem<string>(this.mockData.offerImages)).join(';');
    const isPremium = String(generateRandomBoolean());
    const rating = generateRandomValue(Rating.MIN, Rating.MAX, 1);
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(Rooms.MIN, Rooms.MAX);
    const maxAdults = generateRandomValue(MaxAdults.MIN, MaxAdults.MAX);
    const price = generateRandomValue(Price.MIN, Price.MAX);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const userName = getRandomItem<string>(this.mockData.userNames);
    const location = getRandomItem<Location>(this.mockData.locations);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const commentsCount = generateRandomValue(CommentsLength.MIN, CommentsLength.MAX);

    return [title, description, date, city.cityName, city.cityLocation.latitude, city.cityLocation.longitude, previewImage,
      offerImages, isPremium, rating,
      type, rooms, maxAdults, price, goods, userName,
      email, avatar, userType, commentsCount, location.latitude, location.longitude
    ].join('\t');
  }

}

export {TSVOfferGenerator};
