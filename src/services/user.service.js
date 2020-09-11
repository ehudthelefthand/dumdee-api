const PasswordService = require('../services/password.service');
const UserRepository = require('../repository/user.repository');
const ErrorCode = require('../constant/error.code')


const signup = async (email, password) => {
    const user = await UserRepository.getByEmail(email)
    if (user) throw ErrorCode.EMAIL_DUPLICATED
    return UserRepository.createUser(email, PasswordService.hash(password))
}

const login = async (email, password) => {
    const user = await UserRepository.getByEmail(email)
    if (!user) throw ErrorCode.UNAUTHORIZED

    const isValid = PasswordService.compare(password, user.password)
    if (!isValid) throw ErrorCode.UNAUTHORIZED

    const token = PasswordService.generateToken({ id: user._id, email: user.email });
    return {
        id: user._id,
        email: user.email,
        accessToken: token
    }
}

module.exports = {
    signup,
    login
}