const express = require('express')
const router = express.Router()
const authController = require('../controller/auth')
const { verifyJwtToken } = require('../middleware/verifyJwtToken')
const {
  signUpValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} = require('../validations/auth')

router.post('/login', loginValidation, authController.login)
router.post('/signup', signUpValidation, authController.signUp)
router.post('/logout', authController.logout)
router.post('/forgotPassword', forgotPasswordValidation, authController.forgotPassword)
router.post('/resetPassword', verifyJwtToken, resetPasswordValidation, authController.resetPassword)

module.exports = router
