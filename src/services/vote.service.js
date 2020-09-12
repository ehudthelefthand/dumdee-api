const userRepo = require('../repository/user.repository')
const coffeeRepo = require('../repository/coffee.repository')
const voteRepo = require('../repository/vote.repository')
const ErrorCode = require('../constant/error.code')

const createVote = async ({ score, coffeeId, email }) => {
    try {
        const user = await userRepo.getByEmail(email)
        const coffee = await coffeeRepo.getCoffeeById(coffeeId)
        if (!coffee) throw ErrorCode.COFFEE_NOT_FOUND
        await voteRepo.createVote({ score, coffeeId: coffee._id, userId: user._id })
        const votes = await voteRepo.getByCoffeeId(coffee._id)
        const newVote = votes.reduce((acc, v) => acc + v.score, 0) / votes.length
        const newCoffee = { ...coffee, vote: newVote }
        await coffeeRepo.updateCoffee(newCoffee)
    } catch (err) {
        throw err
    }
}

module.exports = {
    createVote,
}