// process.env.NODE_ENV = 'test';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app');

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Authentication API Tests', () => {
//   let sessionCookie;

//   before((done) => {
//     chai.request(app)
//       .post('/login')
//       .send({ email: 'ktapan176@gmail.com', password: 'newPassword' })
//       .end((err, res) => {
//         const cookies = res.headers['set-cookie'].map((cookie) => cookie.split(';')[0]);
//         sessionCookie = cookies.join('; ');
//         done();
//       });
//   });

//   describe('POST /signup', () => {
//     it('should return status 201 and create a new user', (done) => {
//       chai.request(app)
//         .post('/signup')
//         .send({
//           name: 'Test User',
//           email: 'test@example.com',
//           password: 'password123',
//           confirmPassword: 'password123',
//           address: 'Test Address'
//         })
//         .end((err, res) => {
//           expect(res).to.have.status(201);
//           expect(res.body).to.be.empty;

//           done();
//         });
//     });
//   });

//   describe('POST /login', () => {
//     it('should return status 204 and set a session cookie', (done) => {
//       chai.request(app)
//         .post('/login')
//         .send({ email: 'ktapan176@gmail.com', password: 'newpassword123' })
//         .end((err, res) => {
//           expect(res).to.have.status(204);
//           expect(res).to.have.cookie('connect.sid');
//           expect(res.body).to.be.empty;

//           done();
//         });
//     });
//   });

//   describe('POST /logout', () => {
//     it('should return status 204 and clear the session cookie', (done) => {
//       chai.request(app)
//         .post('/logout')
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(204);
//           expect(res).to.not.have.cookie('connect.sid');
//           expect(res.body).to.be.empty;

//           done();
//         });
//     });
//   });

//   describe('POST /forgotPassword', () => {
//     it('should return status 200 and send a reset token', (done) => {
//       chai.request(app)
//         .post('/forgotPassword')
//         .send({ email: 'ktapan176@gmail.com' })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('code', 'reset_token_sent_successfully');
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('message');

//           done();
//         });
//     });
//   });

//   describe('POST /resetPassword', () => {
//     it('should return status 200 and reset the password', (done) => {
//       chai.request(app)
//         .post('/resetPassword?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//    .eyJlbWFpbCI6Imt0YXBhbjE3NkBnbWFpbC5jb20iLCJpYXQiOjE2ODc3NzgxOTIsImV4cCI6MTY4Nzc4MTc5Mn0
//    .JpByHj0XzXYCQiIq-orcI9t76Vgm45xYMvV2TlNjHC8')
//         .send({ newPassword: 'Tapan@12', confirmPassword: 'Tapan@12' })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('code', 'password_reset_successful');
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('message');

//           done();
//         });
//     });
//   });

// });
