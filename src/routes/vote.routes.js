const express = require('express')
const AuthJwt = require('../middlewares/auth.jwt')
const voteService = require('../services/vote.service')

module.exports = () => {

    const router = express.Router()

    router.post('/votes', AuthJwt.requireUser, async (req, res) => {
        try {
            await voteService.createVote({
                score: req.body.score,
                email: req.user.email,
                coffeeId: req.body.coffeeId
            })
            res.sendStatus(201)
        } catch (err) {
            console.error(err)
            res.status(500).send({ message: err.message })
        }
    })

    return router
}