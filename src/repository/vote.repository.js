const Vote = require('../model/vote')

const createVote = async ({ score, userId, coffeeId }, optSession) => {
    try {
        return await Vote.create({ score, userId, coffeeId }, { session: optSession })
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

const getByCoffeeId = async (coffeeId, optSession) => {
    try {
        return await Vote.find({ coffeeId }).session(optSession).exec()
    } catch (err) {
        throw err
    }
}

module.exports = {
    createVote,
    deleteVote,
    getByCoffeeId,
}