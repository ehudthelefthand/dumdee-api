const express = require('express')
const coffeeService = require('../services/coffee.service')
const AuthJwt = require('../middlewares/auth.jwt')

module.exports = () => {

    const router  = express.Router()

    router.get('/coffees', async (req, res) => {
        try {
            const service = coffeeService(req.user)
            const coffees = await service.getCoffee()
            res.json(coffees)
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    })

    return router
}