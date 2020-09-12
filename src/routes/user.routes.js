const { Router } = require('express')
const user = require('../controllers/user.controller')

module.exports = () => {

    const router = Router()

    router.post('/auth/signup', user.signup);
    router.post('/auth/login', user.login);

    return router
}
