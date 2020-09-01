const { Router } = require('express')
const path = require('path')
const user = require('../controllers/user.controller')

module.exports = () => {

    const router = Router()

    router.post('/auth/signup', user.signup);
    router.post('/auth/login', user.login);

    return router
}
