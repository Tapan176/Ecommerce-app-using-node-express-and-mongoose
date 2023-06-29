// const { expect } = require('chai')
// const sinon = require('sinon')
// const { authenticate } = require('../../middleware/authentication')

// describe('authenticate middleware', () => {
//   let req
//   let res
//   let next

//   beforeEach(() => {
//     req = {
//       session: {}
//     }
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub().returnsThis()
//     }
//     next = sinon.spy()
//   })

//   it('should call next middleware if user exists in session', () => {
//     req.session.user = { id: '6489b58e7ea61d2d2679badc', email: 'ktapan176@gmail.com', name: 'A' }

//     authenticate(req, res, next)

//     expect(next.called).to.be.true
//     expect(res.status.called).to.be.false
//     expect(res.json.called).to.be.false
//   })

//   it('should send 401 status and error message if user does not exist in session', () => {
//     authenticate(req, res, next)

//     expect(next.called).to.be.false
//     expect(res.status.calledWith(401)).to.be.true
//     expect(res.json.calledWith({ code: 'unauthorized', message: 'Unauthorized access' })).to.be.true
//   })
// })
