jest.mock('jsonwebtoken')
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const AuthJwt = require('../../auth.jwt');

const app = express();
app.use(AuthJwt.setUser)

app.get('/everyone', AuthJwt.requireUser, (req, res) => {
    return res.send(req.user);
})
app.get('/user-only', AuthJwt.requireUser, (req, res) => {
    return res.send(req.user);
})
app.get('/admin-only', AuthJwt.requireAdmin, (req, res) => {
    return res.send(req.user);
});

describe('Auth JWT middleware', () => {
    describe('setUser', () => {
        test('should return empty user object', (done) => {
            request(app)
                .get('/everyone')
                .end(function(err, res) {
                    expect(res.body.email).toBeUndefined()
                    done();
                });
        });

        test('should return 401 when verify token failed', (done) => {
            jwt.verify.mockImplementation(() => {
                throw new Error('err')
            });
            request(app)
                .get('/everyone')
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
                .get('/everyone')
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

    describe('requireUser', () => {
        test('should return 401 when no uesr is set', (done) => {
            request(app)
                .get('/user-only')
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    expect(res.status).toEqual(401);
                    done();
                });
        });
    })

    describe('requireAdmin', () => {
        test('should return 401 when no admin is set', (done) => {
            jwt.verify.mockReturnValue({ email: 'user@email.com' });
            request(app)
                .get('/admin-only')
                .set('Accept', 'application/json')
                .set('x-access-token', 'token')
                .end(function (err, res) {
                    expect(res.status).toEqual(401);
                    done();
                });
        });

        test('should return user object when admin is set', (done) => {
            jwt.verify.mockReturnValue({ email: 'admin@email.com' });
            request(app)
                .get('/admin-only')
                .set('Accept', 'application/json')
                .set('x-access-token', 'token')
                .end(function (err, res) {
                    expect(res.status).toEqual(200);
                    expect(jwt.verify).toHaveBeenCalledWith('token', 'jwt_secret');
                    expect(res.body).toEqual({ email: 'admin@email.com' })
                    done();
                });
        });
    })
});