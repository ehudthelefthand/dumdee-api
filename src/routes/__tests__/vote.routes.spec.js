
jest.mock('jsonwebtoken')
jest.mock('../../services/vote.service')
const request = require("supertest")
const app = require('../../express')
const vote = require('../vote.routes')
const jwt = require('jsonwebtoken')
const voteService = require('../../services/vote.service')
const coffeeService = require("../../services/coffee.service")

describe('Vote API', () => {

    beforeAll(() => {
        app.use(vote())
    })

    describe('POST /votes', () => {
        test('without authentication', (done) => {
            request(app)
                .post('/votes')
                .end((err, res) => {
                    if (err) return done(err)

                    expect(res.status).toEqual(401)

                    done()
                })
        })

        test('with authentication', (done) => {
            jwt.verify.mockReturnValue({ email: 'user@email.com' });
            voteService.createVote.mockResolvedValue();

            request(app)
                .post('/votes')
                .send({ coffeeId: 'coffeeId', score: 5 })
                .set('Accept', 'application/json')
                .set('x-access-token', 'token')
                .end((err, res) => {
                    if (err) return done(err)

                    expect(res.status).toEqual(201)
                    expect(voteService.createVote).toHaveBeenCalledWith({ score: 5, coffeeId: 'coffeeId', email: 'user@email.com' })

                    done()
                })
        })
    })
})