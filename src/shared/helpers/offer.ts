import {Goods, Offer, OfferType, UserType, ImageExtType, City} from '../types/index.js';
import {getBooleanFromString} from './common.js';

const createOffer = (offerData: string): Offer => {
  const [
    title,
    description,
    date,
    city,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    type ,
    bedrooms,
    maxAdults,
    price,
    goods,
    name,
    email,
    avatar,
    userType,
    comments,
    longitude,
    latitude
  ] = offerData.replace('\n', '').split('\t');

  const author = {
    name,
    email,
    avatar: avatar as ImageExtType,
    type: userType as UserType};

  return {
    title,
    description,
    date: new Date(date),
    city: city as City,
    previewImage: previewImage as ImageExtType,
    images: images.split(';') as ImageExtType[],
    isPremium: (getBooleanFromString(isPremium)),
    isFavorite: (getBooleanFromString(isFavorite)),
    rating: Number(rating),
    type: type as OfferType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(';') as Goods[],
    author,
    comments: Number(comments),
    location: {longitude: Number(longitude), latitude: Number(latitude)
    }
  };
};

export {createOffer};
