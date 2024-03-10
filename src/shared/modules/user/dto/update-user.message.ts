const updateUserValidationMessages = {
  name: {
    length: 'min length for name is 1 max is 15'
  },
  email: {
    invalidFormat: 'invalid email format'
  },
  avatar: {
    invalidFormat: 'should be an image string'
  },
  password: {
    length: 'password should be min 6 max 12 characters'
  },
  userType: {
    invalidType: 'type should be "regular" or "pro"'
  }
};

export {updateUserValidationMessages};

