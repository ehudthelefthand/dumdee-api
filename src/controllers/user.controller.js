const UserService = require('../services/user.service')
const ErrorCode = require('../constant/error.code');

const signup = (req, res) => {
    return UserService.signup(req.body.email, req.body.password)
        .then(() => {
            res.send({ message: "User was registered successfully!" })
        })
        .catch(err => {
            res.status(500).send({ message: err })
        })
}

const login = async (req, res) => {
    try {
        const result = await UserService.login(req.body.email, req.body.password)
        return res.status(200).send(result)
    } catch (err) {
        if (err === ErrorCode.UNAUTHORIZED) return res.sendStatus(401)
        return res.status(500).send({ message: err })
    }

};

module.exports = {
    signup,
    login
}