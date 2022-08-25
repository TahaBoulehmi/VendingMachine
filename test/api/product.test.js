var supertest = require('supertest')
const seller = supertest.agent('http://localhost:1337')

const signinUser = () => {
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
var productToEdit

describe('Product', () => {
  it('signin', signinUser())
  it('fetch products', done => {
    seller.get('/products').send().expect(200, done)
  })
  it('products fetched are only seller s products', done => {
    seller.get('/products').send().expect(200, done)
  })
  it('create product', done => {
    seller
      .post('/products')
      .send({ name: 'product name', cost: 50, amountAvailable: 50 })
      .expect(res => {
        productToEdit = res.body
        console.log(productToEdit)
      })
      .expect(200, done)
  })
  it('no empty name is accepted', done => {
    seller.post('/products').send({ name: '', cost: 50, amountAvailable: 50 }).expect(400, done)
  })
  it('no negative stock is accepted', done => {
    seller.post('/products').send({ name: 'product name', cost: 50, amountAvailable: -1 }).expect(400, done)
  })
  it('stock should be a natural number', done => {
    seller.post('/products').send({ name: 'product name', cost: 50, amountAvailable: 1.1 }).expect(400, done)
  })
  it('non number stocks should be refused', done => {
    seller.post('/products').send({ name: 'product name', cost: 50, amountAvailable: 'a' }).expect(400, done)
  })
  it('cost should be a multiple of 5', done => {
    seller.post('/products').send({ name: 'product name', cost: 14, amountAvailable: 3 }).expect(400, done)
  })
  it('cost should not be negative', done => {
    seller.post('/products').send({ name: 'product name', cost: -5, amountAvailable: 3 }).expect(400, done)
  })
  it('cost should not be 0', done => {
    seller.post('/products').send({ name: 'product name', cost: 0, amountAvailable: 3 }).expect(400, done)
  })
  it('cost should not be natural number', done => {
    seller.post('/products').send({ name: 'product name', cost: 5.5, amountAvailable: 3 }).expect(400, done)
  })
  it('cost should not be a number', done => {
    seller.post('/products').send({ name: 'product name', cost: 'a', amountAvailable: 3 }).expect(400, done)
  })
  it('edit product', done => {
    seller
      .put('/products')
      .send({ productId: productToEdit.id, name: 'product name edited', cost: 500, amountAvailable: 300 })
      .expect(200, done)
  })
  it('delete product', done => {
    seller.delete('/products').send({ productId: productToEdit.id }).expect(200, done)
  })
})
