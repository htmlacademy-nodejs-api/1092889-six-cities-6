const createOfferValidationMessage = {
  title: {
    length: 'length should between 10 and 100 characters'
  },
  description: {
    length: 'length should between 20 and 1024 characters'
  },
  date: {
    invalidFormat: 'invalid date format'
  },
  city: {
    invalidCity: 'invalid city'
  },
  previewImage: {
    invalidFormat: 'should be an image string'
  },
  images: {
    invalidImages: 'should be an array of image strings'
  },
  isFavorite: {
    notBoolean: 'should be boolean'
  },
  isPremium: {
    notBoolean: 'should be boolean'
  },
  rating: {
    min: 'minimum rating is 1',
    max: 'maximum rating is 5'
  },
  type: {
    invalidType: 'invalid offer type'
  },
  bedrooms: {
    min: 'minimum is 1',
    max: 'maximum is 8'
  },
  maxAdults: {
    min: 'minimum is 1',
    max: 'maximum is 10'
  },
  price: {
    min: 'minimums is 100',
    max: 'maximum is 100 000'
  },
  goods: {
    notArray: 'should be an array of goods',
    empty: 'shouldn\'t be empty'
  },
  authorId: {
    invalidObjectId: 'invalid AuthorId'
  }
};

export {createOfferValidationMessage};
