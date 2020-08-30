const UserService = require('../services/user.service')
const ErrorCode = require('../constant/error.code');

const signup = async (req, res) => {
    try {
        await UserService.signup(req.body.email, req.body.password)
        res.send({ message: "User was registered successfully!" })
    } catch (err) {
        if (err instanceof ErrorCode.TypeErrorCode) return res.status(422).send({ message: err.message })
        res.status(500).send({ message: err.message })
    }
}

const login = async (req, res) => {
    try {
        const result = await UserService.login(req.body.email, req.body.password)
        return res.status(200).send(result)
    } catch (err) {
        if (err === ErrorCode.UNAUTHORIZED) return res.sendStatus(401)
        return res.status(500).send({ message: err.message })
    }

};

module.exports = {
    signup,
    login
}