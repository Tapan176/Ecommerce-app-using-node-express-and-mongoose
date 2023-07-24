const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const helper = require('../utils/helper');

const updatePassword = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('user_not_found');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new Error('incorrect_password');
    }

    if (newPassword !== confirmNewPassword) {
      throw new Error('password_and_confirm_password_do_not_match');
    }

    if (oldPassword === newPassword) {
      throw new Error('new_password_same_as_old_password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.updatedAt = Date.now();

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const updateNameAndAddress = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const { name, address } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('user_not_found');
    }

    user.name = name;
    user.address = address;
    user.updatedAt = Date.now();

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(req.session.user.id);

    if (decoded.email === user.email) {
      user.isVerified = true;
      user.updatedAt = Date.now();
      await user.save();

      res.status(200).json({ code: 'email_verified', message: 'Email verified' });
    } else {
      throw new Error('invalid_verification');
    }
  } catch (error) {
    next(error);
  }
};

const changeEmail = async (req, res, next) => {
  try {
    const { newEmail } = req.body;
    const userId = req.session.user.id;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('user_not_found');
    }

    if (user.email === newEmail) {
      throw new Error('new_email_must_be_different_from_current_email');
    }

    const existingUser = await User.findOne({ email: newEmail });

    if (existingUser) {
      throw new Error('email_already_used');
    }

    user.email = newEmail;
    user.isVerified = false;
    user.updatedAt = Date.now();
    await user.save();

    res.status(200).json({ code: 'email_updated', message: 'Email updated' });
  } catch (error) {
    next(error);
  }
};

const userIsVerified = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId);
    const email = user.email;
    const verificationToken = helper.generateToken({ email });
    const linkToSend = `http://localhost:${process.env.SERVER_PORT}/profile/email/verify?token=${verificationToken}`;
    await helper.sendEmail(email, linkToSend);

    res.status(200).json({ code: 'verify_your_email', message: 'Verify your email' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateNameAndAddress,
  updatePassword,
  changeEmail,
  verifyEmail,
  userIsVerified,
};
