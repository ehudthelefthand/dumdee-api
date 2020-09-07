jest.mock('../../../services/user.service');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const UserService = require('../../../services/user.service');
const userRoute = require('../../../routes/user.routes');
const ErrorCode = require('../../../constant/error.code');

const app = express();
app.use(bodyParser.json())
app.use(userRoute());

describe('UserController', () => {
    describe('POST /auth/signup', () => {
        test('should return 422 when expected error is thrown', (done) => {
            UserService.signup.mockRejectedValue(ErrorCode.EMAIL_DUPLICATED);
            request(app)
                .post('/auth/signup')
                .send({email: 'email@email.com', password: 'pass'})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(422);
                    expect(res.body).toEqual({
                        message: ErrorCode.EMAIL_DUPLICATED.message
                    });
                    done();
                });
        });

        test('should return 500 when unexpected error is thrown', (done) => {
            UserService.signup.mockRejectedValue(new Error('err'));
            request(app)
                .post('/auth/signup')
                .send({email: 'email@email.com', password: 'pass'})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(500);
                    expect(res.body).toEqual({
                        message: 'err'
                    });
                    done();
                });
        });

        test('should return 200 when user register success', (done) => {
            request(app)
                .post('/auth/signup')
                .send({email: 'email@email.com', password: 'pass'})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(200);
                    expect(UserService.signup).toHaveBeenCalledWith('email@email.com', 'pass')
                    done();
                });
        });
    });

    describe('POST /auth/login', () => {
        test('should return 401 when credentials is invalid', (done) => {
            UserService.login.mockRejectedValue(ErrorCode.UNAUTHORIZED);
            request(app)
                .post('/auth/login')
                .send({email: 'email@email.com', password: 'pass'})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(401);
                    done();
                });
        });

        test('should return 500 when unexpected error  is thrown', (done) => {
            UserService.login.mockRejectedValue(new Error('err'));
            request(app)
                .post('/auth/login')
                .send({email: 'email@email.com', password: 'pass'})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(500);
                    expect(res.body).toEqual({
                        message: 'err'
                    });
                    done();
                });
        });

        test('should return 200 with result when credentials is valid', (done) => {
            UserService.login.mockResolvedValue({ email: 'email@email.com' });
            request(app)
                .post('/auth/login')
                .send({email: 'email@email.com', password: 'pass'})
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    expect(res.status).toEqual(200);
                    expect(res.body).toEqual({ email: 'email@email.com' });
                    expect(UserService.login).toHaveBeenCalledWith('email@email.com', 'pass');
                    done();
                });
        });

    });
});