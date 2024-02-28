import dayjs from 'dayjs';
import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/index.js';
import {generateRandomValue, getRandomItem, getRandomItems, generateRandomBoolean} from '../../helpers/index.js';
import {Location} from '../../types/location.type.js';

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
  MIN = 0,
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
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const offerImages = Array.from({length:6}, () => getRandomItem<string>(this.mockData.offerImages)).join(';');
    const isPremium = String(generateRandomBoolean());
    const isFavorite = String(generateRandomBoolean());
    const rating = generateRandomValue(Rating.MIN, Rating.MAX, 1).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(Rooms.MIN, Rooms.MAX).toString();
    const maxAdults = generateRandomValue(MaxAdults.MIN, MaxAdults.MAX).toString();
    const price = generateRandomValue(Price.MIN, Price.MAX).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const userName = getRandomItem<string>(this.mockData.userNames);
    const location = getRandomItem<Location>(this.mockData.locations);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const comments = generateRandomValue(CommentsLength.MIN, CommentsLength.MAX).toString();

    return [title, description, date, city, previewImage,
      offerImages, isPremium, isFavorite, rating,
      type, rooms, maxAdults, price, goods, userName,
      email, avatar, userType, comments, location.latitude, location.longitude
    ].join('\t');
  }

}

export {TSVOfferGenerator};
