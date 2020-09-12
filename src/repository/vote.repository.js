const Vote = require('../model/vote')

const createVote = async ({ score, userId, coffeeId }) => {
    try {
        return await Vote.create({ score, userId, coffeeId })
    } catch (err) {
        throw err
    }
}

const deleteVote = async (voteId) => {
    try {
        await Vote.findByIdAndDelete(voteId)
    } catch (err) {
        throw err
    }
}

const getByCoffeeId = async (coffeeId) => {
    try {
        return await Vote.find({ coffeeId }).exec()
    } catch (err) {
        throw err
    }
}

module.exports = {
    createVote,
    deleteVote,
    getByCoffeeId,
}