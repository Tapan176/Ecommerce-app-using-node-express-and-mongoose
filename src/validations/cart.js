const { validate, Joi } = require('express-validation')

const addItemToCartValidation = validate({
  body: Joi.object({
    itemId: Joi.string().required(),
    quantity: Joi.number().min(1).required()
  })
})

const increaseQuantityValidation = validate({
  params: Joi.object({
    itemId: Joi.string().required()
  })
})

const decreaseQuantityValidation = validate({
  params: Joi.object({
    itemId: Joi.string().required()
  })
})

const deleteItemFromCartValidation = validate({
  params: Joi.object({
    itemId: Joi.string().required()
  })
})

module.exports = {
  addItemToCartValidation,
  increaseQuantityValidation,
  decreaseQuantityValidation,
  deleteItemFromCartValidation
}
