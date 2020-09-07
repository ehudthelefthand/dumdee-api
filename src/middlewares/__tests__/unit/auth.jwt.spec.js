jest.mock('jsonwebtoken')
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const AuthJwt = require('../../auth.jwt');

const app = express();
app.use(AuthJwt.verifyToken)
app.get('/', (req, res) => {
    return res.send(req.user);
});

describe('Auth JWT middleware', () => {
    describe('verifyToken', () => {
        test('should return 403 when no token found', (done) => {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(403);
                    expect(res.body).toEqual({ message: "No token !"})
                    done();
                });
        });
        test('should return 401 when verify token failed', (done) => {
            jwt.verify.mockImplementation(() => {
                throw new Error('err')
            });
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .set('x-access-token', 'token')
                .end(function(err, res) {
                    expect(res.status).toEqual(401);
                    done();
                });
        });

        test('should set user in req when passed verify token', (done) => {
            jwt.verify.mockReturnValue({ email: 'email@email.com' });
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .set('x-access-token', 'token')
                .end(function(err, res) {
                    expect(res.status).toEqual(200);
                    expect(jwt.verify).toHaveBeenCalledWith('token', 'jwt_secret');
                    expect(res.body).toEqual({  email: 'email@email.com' })
                    done();
                });


        })
    });
});