const coffeeRepo = require('../repository/coffee.repository')

module.exports = (user) => {
    return {
        getCoffee: user ? coffeeRepo.getCoffeeWithVote : coffeeRepo.getCoffee,
    }
}