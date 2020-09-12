
jest.mock('jsonwebtoken')
jest.mock('../../services/vote.service')
const request = require("supertest")
const app = require('../../express')
const vote = require('../vote.routes')
const jwt = require('jsonwebtoken')
const voteService = require('../../services/vote.service')

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
                .send({ coffeeId: 'coffeeId' })
                .set('Accept', 'application/json')
                .set('x-access-token', 'token')
                .end((err, res) => {
                    if (err) return done(err)

                    expect(res.status).toEqual(201)
                    expect(voteService.createVote).toHaveBeenCalledWith({ email: 'user@email.com' }, 'coffeeId')

                    done()
                })
        })
    })
})