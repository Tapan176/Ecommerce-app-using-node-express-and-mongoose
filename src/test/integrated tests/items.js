// process.env.NODE_ENV = 'test';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../../app');
// const fs = require('fs');

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Items API Tests', () => {
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

//   describe('GET /items', () => {
//     it('should return status 200 and an array of items', (done) => {
//       chai.request(app)
//         .get('/items')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           expect(res.body.length).to.be.greaterThan(0);

//           done();
//         });
//     });
//   });

//   describe('GET /items/:itemId', () => {
//     it('should return status 200 and the item with the given itemId', (done) => {
//       chai.request(app)
//         .get(`/items/64894c6fc6d50932c67cde70`)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('_id', '64894c6fc6d50932c67cde70');

//           done();
//         });
//     });
//   });

//   describe('GET /items/search', () => {
//     it('should return status 200 and an array of items matching the search query', (done) => {
//       chai.request(app)
//         .get('/items/search')
//         .query({ searchString: 'sam' })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');

//           done();
//         });
//     });
//   });

//   describe('GET /items/filter', () => {
//     it('should return status 200 and an array of items filtered by the provided parameters', (done) => {
//       chai.request(app)
//         .get('/items/filter')
//         .query({ category: 'Mobile Phones', minPrice: '500', maxPrice: '1999' })
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');

//           done();
//         });
//     });
//   });

//   describe('GET /category/:categoryId/items', () => {
//     it('should return status 200 and an array of items belonging to the specified category', (done) => {
//       chai.request(app)
//         .get('/category/649028d8ab45d58a342e6374/items')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');

//           done();
//         });
//     });
//   });

//   describe('POST /items', () => {
//     it('should return status 201 and create a new item', (done) => {
//       chai.request(app)
//         .post('/items')
//         .set('Cookie', sessionCookie)
//         .set('Content-Type', 'application/x-www-form-urlencoded')
//         .field('title', 'Test Item')
//         .field('category', 'Mobile Phones')
//         .field('description', 'Mobile Phones')
//         .field('price', '10.99')
//         .field('quantity', '10')
//         .attach('itemImages',
//             fs.readFileSync('D:/ICT/ZuruTech/Practice/Ecommerce/public/uploads/itemImages-1687241449039-6489b58e7ea61d2d2679badc-2.png'),
//             'itemImages-1687241449039-6489b58e7ea61d2d2679badc-2.png')
//         .end((err, res) => {
//             expect(res).to.have.status(201);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.property('message', 'Item added successfully');
//             done();
//         });

//     });
//   });

//   describe('PUT /items/:itemId', () => {
//     it('should return status 200 and update the item with the given itemId', (done) => {
//       chai.request(app)
//         .put(`/items/649aaebc61e0cda231fe39c6`)
//         .set('Cookie', sessionCookie)
//         .field('quantity', '35')
//         .attach('itemImages',
//             fs.readFileSync('D:/ICT/ZuruTech/Practice/Ecommerce/public/uploads/itemImages-1687241449039-6489b58e7ea61d2d2679badc-2.png'),
//             'itemImages-1687241449039-6489b58e7ea61d2d2679badc-2.png')
//         .end((err, res) => {
//             expect(res).to.have.status(200);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.property('quantity');
//             expect(res.body).to.have.property('images');
//             done();
//         });
//     });
//   });

//   describe('DELETE /items/:itemId', () => {
//     it('should return status 200 and delete the item with the given itemId', (done) => {
//       chai.request(app)
//         .delete(`/items/64894c6fc6d50932c67cde73`)
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('message', 'Item deleted successfully');

//           done();
//         });
//     });
//   });

//   describe('GET /items/myItems', () => {
//     it('should return status 200 and an array of items created by the authenticated user', (done) => {
//       chai.request(app)
//         .get('/items/myItems')
//         .set('Cookie', sessionCookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');

//           done();
//         });
//     });
//   });

// });
