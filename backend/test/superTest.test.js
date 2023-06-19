/*
*
* LANZAR EL SERVIDOR CON 'npm run testing'
* PARA UTILIZAR LA DB DE TESTING
*
*/

import chai from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";

const expect = chai.expect
const requester = supertest('http://localhost:8080') // Tested App URL

describe('Session, products and cart tests - creating test user', function () {
  // Vars to be used along into the integral test
  let testCartID
  let testSessionToken
  const adminLoginData = {
    email: "adminCoder123@coder.com",
    password: "adminC0der123"
  }
  const testUserLoginData = {
    email: 'mlpachecodev@gmail.com',
    password: 'testpassword'
  }
  const TESTPRODUCT1 = { id: '6490846bf337492cc90a3a34', price: 9332.00 }
  const TESTPRODUCT2 = { id: '64908448f337492cc90a3a33', price: 3136.00 }
  const expectedTotalAmount = TESTPRODUCT2.price * 3

  after(async () => {
    let adminCookie, response
    // Login as ADMIN
    response = await requester.post('/api/session/login')
      .send(adminLoginData)

    adminCookie = response.headers['set-cookie'][0].split(';')

    // Deleting test user
    await requester.delete('/api/users')
      .set('Cookie', adminCookie)
      .send({ email: testUserLoginData.email })

    // Admin logout
    await requester.get('/api/session/logout')

    // Checking if the user has been deleted by login fail/wrong credentials
    response = await requester.post('/api/session/login')
      .send(testUserLoginData)

    expect(response.status).to.equal(401)
  })

  describe('Integral testing: new user purchase', async () => {

    it('should register a test user', async () => {
      const response = await requester.post('/api/session/register')
        .send({
          first_name: 'TestUser',
          last_name: 'user',
          email: testUserLoginData.email,
          password: testUserLoginData.password,
        })

      expect(response.status).to.equal(201)
    })

    it('should not find an active session before login', async () => {
      const response = await requester.get('/api/session/current')

      expect(response.status).to.equal(404)
    })

    it('should block a protected route without a valid session token', async () => {
      const response = await requester.get('/api/carts')
        .set('Cookie', '') // Empty session cookie to test unauthorized access

      expect(response.status).to.be.equal(401)
    })

    it('should login with the new test user and retrieve its session cookie', async () => {
      const response = await requester.post('/api/session/login')
        .send(testUserLoginData)

      testSessionToken = response.headers['set-cookie'][0].split(';')

      expect(testSessionToken).to.not.be.empty
    })

    it('should get test user data (including associated cart id)', async () => {
      const response = await requester.get('/api/session/current')
        .set('Cookie', testSessionToken)

      testCartID = response.body.cart_id

      expect(response.body).to.have.property('cart_id')
    })

    it('should allow access to protected routes with a valid session token', async () => {
      const response = await requester.get('/api/carts')
        .set('Cookie', testSessionToken) // Sending session cookie of the new test user

      expect(response.status).to.equal(200)
    })

    it('should add x1 testproduct1 to the test user cart', async () => {
      let response = await requester.post(`/api/carts/product/${TESTPRODUCT1.id}`)
        .set('Cookie', testSessionToken)

      expect(response.status).to.equal(201)
    })

    it('should add x3 testproduct2 to the cart', async () => {
      await requester.post(`/api/carts/product/${TESTPRODUCT2.id}`)
        .set('Cookie', testSessionToken)

      let response = await requester.put(`/api/carts/${testCartID}/product/${TESTPRODUCT2.id}`)
        .set('Cookie', testSessionToken)
        .send({ quantity: 3 })

      expect(response.status).to.equal(200)
    })

    it('should remove the first single product', async () => {
      let response = await requester.delete(`/api/carts/${testCartID}/product/${TESTPRODUCT1.id}`)
        .set('Cookie', testSessionToken)

      expect(response.status).to.equal(200)

    })

    it('Should purchase the cart and generate an invoice with the correct total amount', async () => {
      let response = await requester.post('/api/carts/purchase')
        .set('Cookie', testSessionToken)

      expect(response.body).to.have.property('invoice').to.have.property('total_amount').to.equal(expectedTotalAmount)
    })

    it('Should logout as test user', async () => {
      let response = await requester.get('/api/session/logout')
        .set('Cookie', testSessionToken)

      expect(response.status).to.equal(200)
    })
  })
})