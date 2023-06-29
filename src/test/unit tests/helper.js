// const { expect } = require('chai')
// const jwt = require('jsonwebtoken')
// const { generateToken } = require('../../utils/helper')

// describe('generateToken', () => {
//   it('should generate a valid JWT token', () => {
//     const payload = { email: 'ktapan176@gmail.com' }

//     const token = generateToken(payload)
//     expect(token).to.be.a('string')
//     expect(token).to.not.be.empty
//   })

//   it('should include the payload in the generated token', () => {
//     const payload = { email: 'ktapan176@gmail.com' }
//     const secret = 'tapan'

//     const token = generateToken(payload, secret)

//     const decoded = jwt.verify(token, secret)
//     expect(decoded.email).to.deep.equal(payload.email)
//   })
// })
