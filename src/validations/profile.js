const { validate, Joi } = require('express-validation')

const updatePasswordValidation = validate({
  body: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required()
  })
})

const updateNameAndAddressValidation = validate({
  body: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required()
  })
})

const changeEmailValidation = validate({
  body: Joi.object({
    newEmail: Joi.string().email().required()
  })
})

const verifyEmailValidation = validate({
  query: Joi.object({
    token: Joi.string().required()
  })
})

module.exports = {
  updatePasswordValidation,
  updateNameAndAddressValidation,
  changeEmailValidation,
  verifyEmailValidation
}
