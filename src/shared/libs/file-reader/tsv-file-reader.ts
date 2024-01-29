import {FileReader} from './file-reader.interface.js';
import {readFile} from 'node:fs/promises';
import {Goods, Offer, OfferType, UserType} from '../../types/index.js';
import {City} from '../../types/city.type.js';
import {ImageExtType} from '../../types/common.type.js';

class TsvFileReader implements FileReader{
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public async read() {
    this.rawData = await readFile(this.filename, { encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if(!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        date,
        city,
        previewImage,
        images,
        isPremium,
        isFavorite,
        rating,
        type,
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
        latitude]) => (
        {
          title,
          description,
          date: new Date(date),
          city: city as City,
          previewImage: previewImage as ImageExtType,
          images: images.split(' ') as ImageExtType[],
          isPremium: (isPremium === 'true'),
          isFavorite: (isFavorite === 'true'),
          rating: Number(rating),
          type: type as OfferType,
          bedrooms: Number(bedrooms),
          maxAdults: Number(maxAdults),
          price: Number(price),
          goods: goods.trim().split(' ').map((el) => el.replace('-', ' ')) as Goods[],
          author: {name, email, avatar: avatar as ImageExtType, type: userType as UserType},
          comments: Number(comments),
          location: {longitude: Number(longitude), latitude: Number(latitude)}
        }));
  }
}

export {TsvFileReader};
