import {City} from './city.type.js';
import {ImageExtType} from './common.type.js';
import {User} from './user.type.js';
import {Location} from './location.type.js';

type Goods = 'Breakfast' | 'Air Conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

type OfferType = 'apartment' | 'house' | 'room' | 'hotel'

type Offer = {
  title: string,
  description: string,
  date: Date,
  city: City,
  previewImage: ImageExtType,
  images: ImageExtType[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  type: OfferType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: Goods[],
  author: Omit<User, 'password'>,
  comments: number,
  location: Location
}

export {Offer, OfferType, Goods};
