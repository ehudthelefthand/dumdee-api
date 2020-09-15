const express = require('express')

module.exports = () => {

    const router  = express.Router()

    router.get('/coffees', async (req, res) => {
        res.sendStatus(200)
    })

    return router
}