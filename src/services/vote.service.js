const userRepo = require('../repository/user.repository')
const coffeeRepo = require('../repository/coffee.repository')
const voteRepo = require('../repository/vote.repository')
const ErrorCode = require('../constant/error.code')
const withTransaction = require('./transaction')

const createVote = async ({ score, coffeeId, email }) => {
    try {
        await withTransaction(async (session) => {
            const user = await userRepo.getByEmail(email, session)
            const coffee = await coffeeRepo.getCoffeeById(coffeeId, session)
            if (!coffee) throw ErrorCode.COFFEE_NOT_FOUND
            await voteRepo.createVote({ score, coffeeId: coffee._id, userId: user._id }, session)
            const votes = await voteRepo.getByCoffeeId(coffee._id, session)
            const newVote = votes.reduce((acc, v) => acc + v.score, 0) / votes.length
            const newCoffee = { ...coffee.toObject(), vote: newVote }
            await coffeeRepo.updateCoffee(newCoffee, session)
        })
    } catch (err) {
        throw err
    }
}

module.exports = {
    createVote,
}