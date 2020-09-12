const express = require('express')
const coffeeService = require('../services/coffee.service')

module.exports = () => {

    const router  = express.Router()

    router.get('/coffees', async (req, res) => {
        try {
            const service = coffeeService(req.user)
            const coffees = await service.getCoffee()
            res.json(coffees)
        } catch (err) {
            throw err
        }
    })

    return router
}