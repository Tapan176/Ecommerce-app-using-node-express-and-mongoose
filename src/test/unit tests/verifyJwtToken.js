// const { expect } = require('chai');
// const jwt = require('jsonwebtoken');
// const sinon = require('sinon');
// const { verifyJwtToken } = require('../../middleware/verifyJwtToken');

// describe('verifyJwtToken middleware', () => {
//   let req;
//   let res;
//   let next;

//   beforeEach(() => {
//     req = {
//       query: {},
//     };
//     res = {};
//     next = sinon.stub();
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   it('should call next middleware if the token is valid', () => {
//     const token = 'valid_token';
//     req.query.token = token;

//     const verifyStub = sinon.stub(jwt, 'verify').returns({});

//     verifyJwtToken(req, res, next);

//     expect(verifyStub.calledOnceWith(token, process.env.JWT_SECRET)).to.be.true;
//     expect(next.calledOnce).to.be.true;

//     verifyStub.restore();
//   });

//   it('should throw an error if the token is invalid', () => {
//     const token = 'invalid_token';
//     req.query.token = token;

//     const verifyStub = sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

//     verifyJwtToken(req, res, next);

//     expect(verifyStub.calledOnceWith(token, process.env.JWT_SECRET)).to.be.true;
//     expect(next.calledOnce).to.be.true;
//     expect(next.firstCall.args[0]).to.be.an.instanceOf(Error);
//     expect(next.firstCall.args[0].message).to.equal('Invalid token');

//     verifyStub.restore();
//   });
// });
