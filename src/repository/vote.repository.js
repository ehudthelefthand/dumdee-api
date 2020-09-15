const Vote = require('../model/vote')

const createVote = async ({ score, userId, coffeeId }) => {
    return Promise.resolve()
}

const deleteVote = async (voteId) => {
    return Promise.resolve()
}

const getByCoffeeId = async (coffeeId) => {
    return Promise.resolve()
}

module.exports = {
    createVote,
    deleteVote,
    getByCoffeeId,
}