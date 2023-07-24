const express = require('express');

const router = express.Router();
const profileController = require('../controller/profile');
const { authenticate } = require('../middleware/authentication');
const { verifyJwtToken } = require('../middleware/verifyJwtToken');
const {
  updatePasswordValidation,
  updateNameAndAddressValidation,
  changeEmailValidation,
  verifyEmailValidation,
} = require('../validations/profile');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile endpoints
 */

/**
 * @swagger
 * /profile/changePassword:
 *   put:
 *     summary: Change user password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updatePassword'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulPasswordUpdate'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.put('/profile/changePassword', authenticate, updatePasswordValidation, profileController.updatePassword);

/**
 * @swagger
 * /profile/changeNameAndAddress:
 *   put:
 *     summary: Change user name and address
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateNameAndAddress'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulNameAndAddressUpdate'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.put('/profile/changeNameAndAddress', authenticate, updateNameAndAddressValidation, profileController.updateNameAndAddress);

/**
 * @swagger
 * /profile/changeEmail:
 *   post:
 *     summary: Change user email
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changeEmail'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/successfulEmailChange'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.post('/profile/changeEmail', authenticate, changeEmailValidation, profileController.changeEmail);

/**
 * @swagger
 * /profile/userEmail/verify:
 *   post:
 *     summary: Check if user email is verified
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/userEmailVerified'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.post('/profile/userEmail/verify', authenticate, profileController.userIsVerified);

/**
 * @swagger
 * /profile/email/verify:
 *   put:
 *     summary: Verify user email
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/verifyEmail'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/emailVerificationSuccessful'
 *       '400':
 *         $ref: '#/components/responses/invalidRequest'
 *       '401':
 *         $ref: '#/components/responses/unauthorized'
 *       '500':
 *         $ref: '#/components/responses/internalServerError'
 */
router.put('/profile/email/verify', authenticate, verifyJwtToken, verifyEmailValidation, profileController.verifyEmail);

module.exports = router;
