jest.mock('bcryptjs')
jest.mock('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PasswordService = require('../../password.service');

describe('Password service', () => {
    describe('hash', () => {
        beforeEach(() => {
            bcrypt.hashSync.mockReturnValue('hashed string');
        });
        test("should return hashed string", () => {
            expect(PasswordService.hash('hello')).toEqual('hashed string');
        });
        test("should call hashSync with correct params", () => {
            PasswordService.hash('hello');
            expect(bcrypt.hashSync).toHaveBeenCalledWith('hello', 8);
        });
    });

    describe('compare', () => {
        beforeEach(() => {
            bcrypt.compareSync.mockReturnValue(true);
        });
        test("should return compared result", () => {
            expect(PasswordService.compare('hello', 'hashed hello')).toEqual(true);
        });
        test("should call compareSync with correct params", () => {
            PasswordService.compare('hello', 'hashed hello');
            expect(bcrypt.compareSync).toHaveBeenCalledWith('hello', 'hashed hello');
        });
    });

    describe('generateToken', () => {
        beforeEach(() => {
            jwt.sign.mockReturnValue('jwt string');
        });
        test("should return jwt string", () => {
            expect(PasswordService.generateToken({ content: 'mock' })).toEqual('jwt string');
        });
        test("should call sign with correct params", () => {
            PasswordService.generateToken({ content: 'mock' });
            expect(jwt.sign).toHaveBeenCalledWith({ content: 'mock' }, 'jwt_secret',{
                expiresIn: 86400
            });
        });
    });

});