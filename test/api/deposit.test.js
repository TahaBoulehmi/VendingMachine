var supertest = require('supertest')
const buyer = supertest.agent('http://localhost:1337')

const signinUser = () => {
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

describe('Deposit', () => {
  it('signin', signinUser())
  it('deposit 5 coins', done => {
    buyer.post('/deposit').send({ deposit: 5 }).expect(200, done)
  })
  it('deposit 10 coins', done => {
    buyer.post('/deposit').send({ deposit: 10 }).expect(200, done)
  })
  it('deposit 20 coins', done => {
    buyer.post('/deposit').send({ deposit: 20 }).expect(200, done)
  })
  it('deposit 50 coins', done => {
    buyer.post('/deposit').send({ deposit: 50 }).expect(200, done)
  })
  it('deposit 100 coins', done => {
    buyer.post('/deposit').send({ deposit: 100 }).expect(200, done)
  })
  it('deposit of other coins should be refused', done => {
    buyer.post('/deposit').send({ deposit: 3 }).expect(400, done)
  })
  it('deposit of negative value should be refused', done => {
    buyer.post('/deposit').send({ deposit: -5 }).expect(400, done)
  })
  it('deposit of non number should be refused', done => {
    buyer.post('/deposit').send({ deposit: 'a' }).expect(400, done)
  })
  it('deposit with empty coins should be refused', done => {
    buyer.post('/deposit').send().expect(400, done)
  })
  it('reset should be working', done => {
    buyer.post('/reset').send().expect(200, done)
  })
})
