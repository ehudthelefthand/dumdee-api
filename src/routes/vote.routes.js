const express = require('express')
const AuthJwt = require('../middlewares/auth.jwt')
const voteService = require('../services/vote.service')

module.exports = () => {

    const router = express.Router()

    router.post('/votes', AuthJwt.requireUser, async (req, res) => {
        try {
            await voteService.createVote(req.user, req.body.coffeeId)
            res.sendStatus(201)
        } catch (err) {
            throw err
        }
    })

    return router
}