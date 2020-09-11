jest.mock('../../../repository/user.repository');
jest.mock('../../../services/password.service');
const UserRepository = require('../../../repository/user.repository')
const PasswordService = require('../../../services/password.service')
const UserService =require('../../user.service');
const ErrorCode = require('../../../constant/error.code');

describe('UserService', () => {
    describe('signup', () => {
        beforeEach(() => {
            UserRepository.getByEmail.mockResolvedValue(null);
        });
        test('should throw duplicate email when found user', async () => {
            UserRepository.getByEmail.mockResolvedValue({ email: 'email@email.com'});
            try {
                await UserService.signup('email@email.com', 'pass');
                fail()
            } catch (err) {
                expect(UserRepository.getByEmail).toHaveBeenCalledWith('email@email.com')
                expect(err).toEqual(ErrorCode.EMAIL_DUPLICATED)
            }
        });

        test('should create user with email and hashed password', async () => {
            PasswordService.hash.mockReturnValue('hashed')
            try {
                await UserService.signup('email@email.com', 'pass');
                expect(UserRepository.createUser).toHaveBeenCalledWith('email@email.com', 'hashed')
            } catch (err) {
                fail(err)
            }
        });
    });

    describe('login', () => {
        beforeEach(() => {
            UserRepository.getByEmail.mockResolvedValue({
                _id: 'mockedId',
                password: 'mocked password',
                email: 'email@email.com'
            });
            PasswordService.compare.mockReturnValue(true);
            PasswordService.generateToken.mockReturnValue('mocked token');
        });

        test('should return Unauthorized when user is not found', async () => {
            UserRepository.getByEmail.mockResolvedValue(null);
            try {
                await UserService.login('email@email.com', 'pass');
                fail()
            } catch (err) {
                expect(UserRepository.getByEmail).toHaveBeenCalledWith('email@email.com');
                expect(err).toEqual(ErrorCode.UNAUTHORIZED);
            }
        });

        test('should return Unauthorized when password is invalid', async () => {
            PasswordService.compare.mockReturnValue(false)
            try {
                await UserService.login('email@email.com', 'pass');
                fail();
            } catch (err) {
                expect(PasswordService.compare).toHaveBeenCalledWith('pass', 'mocked password');
                expect(err).toEqual(ErrorCode.UNAUTHORIZED);
            }
        });

        test('should return user profile and access token when email and password is correct', async () => {
            try {
                const result = await UserService.login('email@email.com', 'pass');
                expect(PasswordService.generateToken).toHaveBeenCalledWith({ id: 'mockedId', email: 'email@email.com'})               ;
                expect(result).toEqual({
                    id: 'mockedId',
                    email: 'email@email.com',
                    accessToken: 'mocked token'
                });
            } catch (err) {
                fail(err);
            }
        });

    });
});
