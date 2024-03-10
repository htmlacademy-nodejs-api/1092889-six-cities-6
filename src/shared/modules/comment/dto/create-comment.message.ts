const createCommentValidationMessage = {
  content: {
    length: 'content should be min5 max 1024 characters'
  },
  rating:{
    min: 'min rating is 1',
    max: 'max rating is 5'
  },
  authorId: {
    invalidFormat: 'should be valid ObjectId'
  }
};

export {createCommentValidationMessage};
