var supertest = require('supertest')
const seller = supertest.agent('http://localhost:1337')
const buyer = supertest.agent('http://localhost:1337')

const signinSeller = () => {
  return done => {
    seller
      .put('/signin')
      .send({ username: 'seller', password: 'seller' })
      .expect(200)
      .end(err => {
        if (err) return done(err)
        return done()
      })
  }
}
const signinBuyer = () => {
  return done => {
    buyer
      .put('/signin')
      .send({ username: 'buyer', password: 'buyer' })
      .expect(200)
      .end(err => {
        if (err) return done(err)
        return done()
      })
  }
}
var productToEdit

describe('Buy', () => {
  it('signin Seller', signinSeller())
  it('signin Buyer', signinBuyer())
  it('create product', done => {
    seller
      .post('/products')
      .send({ name: 'product name', cost: 50, amountAvailable: 1 })
      .expect(res => {
        productToEdit = res.body
        console.log(productToEdit)
      })
      .expect(200, done)
  })
  it('buying product with less balance', done => {
    buyer.post('/buy').send({ productId: productToEdit.id, amount: 1 }).expect(400, done)
  })
  it('deposit product cost', done => {
    buyer.post('/deposit').send({ deposit: 50 }).expect(200, done)
  })
  it('buying product more than stock', done => {
    buyer.post('/buy').send({ productId: productToEdit.id, amount: 2 }).expect(400, done)
  })
  it('buying the product', done => {
    buyer.post('/buy').send({ productId: productToEdit.id, amount: 1 }).expect(200, done)
  })
  it('buying a sold out product', done => {
    buyer.post('/buy').send({ productId: productToEdit.id, amount: 1 }).expect(400, done)
  })
  // Test BALANCE AFTER BUYING
})
