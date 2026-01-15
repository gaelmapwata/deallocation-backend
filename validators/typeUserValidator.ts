const typeUserValidator = {
  storeSchema: {
    name: {
      notEmpty: true,
      errorMessage: 'The "name" field is mandatory',
    },
  },

  updateSchema: {
    name: {
      notEmpty: {
        errorMessage: 'The "name" field is mandatory',
      },
    },
  },
};

export default typeUserValidator;
