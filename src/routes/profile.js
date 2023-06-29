const express = require('express')
const router = express.Router()
const profileController = require('../controller/profile')
const { authenticate } = require('../middleware/authentication')
const { verifyJwtToken } = require('../middleware/verifyJwtToken')
const {
  updatePasswordValidation,
  updateNameAndAddressValidation,
  changeEmailValidation,
  verifyEmailValidation
} = require('../validations/profile')

router.put('/profile/changePassword', authenticate, updatePasswordValidation, profileController.updatePassword)
router.put('/profile/changeNameAndAddress', authenticate, updateNameAndAddressValidation, profileController.updateNameAndAddress)
router.post('/profile/changeEmail', authenticate, changeEmailValidation, profileController.changeEmail)
router.post('/profile/userEmail/verify', authenticate, profileController.userIsVerified)
router.put('/profile/email/verify', authenticate, verifyJwtToken, verifyEmailValidation, profileController.verifyEmail)

module.exports = router
