const express = require('express')

module.exports = () => {

    const router = express.Router()

    router.post('/votes', async (req, res) => {
        res.sendStatus(200)
    })

    return router
}