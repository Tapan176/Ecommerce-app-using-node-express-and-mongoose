const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { sendEmailMock } = require('./mocks')
const dotenv = require('dotenv')

dotenv.config()

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
  return token
}

let sendEmail

if (process.env.NODE_ENV === 'test') {
  sendEmail = sendEmailMock
} else {
  sendEmail = async (email, linkToSend, next) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'tapan.khokhariya109229@marwadiuniversity.ac.in',
          pass: 'Tapan@1701'
        }
      })

      const mailOptions = {
        from: 'tapan.khokhariya109229@marwadiuniversity.ac.in',
        to: email,
        subject: 'Reset Password',
        text: `${linkToSend}`
      }

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw new Error('failed_to_send_email')
        } else {
          console.log('Email sent:', info.response)
          return ({ code: 'email_sent_successfully', message: 'Email sent successfully' })
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  generateToken,
  sendEmail
}
