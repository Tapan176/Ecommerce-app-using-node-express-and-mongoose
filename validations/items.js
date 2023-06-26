const { validate, Joi } = require('express-validation');

const addItemValidation = validate({
  body: Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
});

const updateItemValidation = validate({
  params: Joi.object({
    itemId: Joi.string().required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
});

const deleteItemValidation = validate({
  params: Joi.object({
    itemId: Joi.string().required(),
  }),
});

const getItemsByCategoryValidation = validate({
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
});

const searchItemValidation = validate({
  query: Joi.object({
    searchString: Joi.string().min(3).required(),
  }),
});

const applyFiltersValidation = validate({
  query: Joi.object({
    category: Joi.string().optional(),
    minPrice: Joi.number().optional(),
    maxPrice: Joi.number().optional(),
  }),
});

module.exports = {
  addItemValidation,
  updateItemValidation,
  deleteItemValidation,
  getItemsByCategoryValidation,
  searchItemValidation,
  applyFiltersValidation,
};
