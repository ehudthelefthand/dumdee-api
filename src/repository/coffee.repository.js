const Coffee = require('../model/coffee')

const createCoffee = async (data) => {
    try {
        return await Coffee.create(data)
    } catch (err) {
        throw err
    }
}

module.exports = {
    createCoffee
}