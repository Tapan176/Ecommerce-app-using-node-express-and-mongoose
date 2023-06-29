// process.env.NODE_ENV = 'test';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app');

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Cart API Tests', () => {
//   let sessionCookie;

//   before((done) => {
//     chai.request(app)
//       .post('/login')
//       .send({ email: 'ktapan176@gmail.com', password: 'Tapan@12' })
//       .end((err, res) => {
//         const cookies = res.headers['set-cookie'].map((cookie) => cookie.split(';')[0]);
//         sessionCookie = cookies.join('; ');
//         done();
//       });
//   });

//   describe('POST /cart/addItems', () => {
//     it('should add an item to the cart', (done) => {
//       chai.request(app)
//         .post('/cart/addItems')
//         .set('Cookie', sessionCookie)
//         .send({ itemId: '6489b1f1881cefcae21df9e1', quantity: 1 })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('code', 'item_added_to_cart_successfully');
//           expect(res.body).to.have.property('message').to.be.a('string').and.contain('successfully');
//           done();
//         });
//     });
//   });

//   describe('GET /cart', () => {
//     it('should return the cart items', (done) => {
//       chai.request(app)
//         .get('/cart')
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           expect(res.body[0]).to.have.property('itemId');
//           done();
//         });
//     });
//   });

//   describe('PUT /cart/increaseQuantity/:itemId', () => {
//     it('should increase the quantity of an item in the cart', (done) => {
//       const itemId = '6489b1f1881cefcae21df9e1';
//       chai.request(app)
//         .put(`/cart/increaseQuantity/${itemId}`)
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('code', 'quantity_increased_successfully');
//           expect(res.body).to.have.property('message').to.be.a('string');
//           done();
//         });
//     });
//   });

//   describe('PUT /cart/decreaseQuantity/:itemId', () => {
//     it('should decrease the quantity of an item in the cart', (done) => {
//       const itemId = '6489b1f1881cefcae21df9e1';
//       chai.request(app)
//         .put(`/cart/decreaseQuantity/${itemId}`)
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('code', 'quantity_decreased_successfully');
//           expect(res.body).to.have.property('message').to.be.a('string');
//           done();
//         });
//     });
//   });

//   describe('DELETE /cart/delete/:itemId', () => {
//     it('should delete an item from the cart', (done) => {
//       const itemId = '6489b1f1881cefcae21df9e1';
//       chai.request(app)
//         .delete(`/cart/delete/${itemId}`)
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('code', 'item_deleted_from_cart_successfully');
//           expect(res.body).to.have.property('message').to.be.a('string');
//           done();
//         });
//     });
//   });

//   describe('POST /cart/checkout', () => {
//     it('should checkout the cart items', (done) => {
//       chai.request(app)
//         .post('/cart/checkout')
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.property('orderId').to.be.a('string');
//           expect(res.body).to.have.property('totalAmount').to.be.a('number').above(0);
//           done();
//         });
//     });
//   });

//   describe('DELETE /cart/empty', () => {
//     it('should empty the cart', (done) => {
//       chai.request(app)
//         .delete('/cart/empty')
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.have.all.keys('code', 'message');
//           expect(res.body.code).to.be.a('string').and.have.lengthOf.above(0);
//           expect(res.body.message).to.be.a('string').and.not.empty;
//           done();
//         });
//     });
//   });

// });
