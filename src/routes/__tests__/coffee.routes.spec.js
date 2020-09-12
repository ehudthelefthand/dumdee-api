
jest.mock('jsonwebtoken')
jest.mock('../../repository/coffee.repository')
const request = require("supertest")
const app = require('../../express')
const coffee = require('../coffee.routes')
const coffeeRepo = require('../../repository/coffee.repository')
const jwt = require("jsonwebtoken")

describe('Coffee API', () => {

    beforeAll(() => {
        app.use(coffee())
    })

    describe('GET /coffees', () => {
        test('without authentication', (done) => {
            coffeeRepo.getCoffee.mockResolvedValue({
                _id: 'coffeeId'
            })
            request(app)
                .get('/coffees')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err)

                    expect(res.status).toEqual(200)
                    expect(res.body._id).toBeDefined()
                    expect(res.body.vote).toBeUndefined()
                    expect(coffeeRepo.getCoffee).toHaveBeenCalled()

                    done()
                })
        })

        test('with authentication', (done) => {
            jwt.verify.mockReturnValue({ email: 'user@mail.com' })
            coffeeRepo.getCoffeeWithVote.mockResolvedValue([{
                _id: 'coffeeId',
                vote: 5
            }])

            request(app)
                .get('/coffees')
                .set('x-access-token', 'token')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) return done(err)

                    expect(res.status).toEqual(200)
                    expect(res.body.length).toEqual(1)
                    expect(res.body[0]._id).toBeDefined()
                    expect(res.body[0].vote).toEqual(5)
                    expect(coffeeRepo.getCoffeeWithVote).toHaveBeenCalled()

                    done()
                })
        })
    })
})