const Coffee = require('../model/coffee')

const createCoffee = async (data) => {
    try {
        return await Coffee.create(data)
    } catch (err) {
        throw err
    }
}

const updateCoffee = async (data, optSession) => {
    try {
        return await Coffee.findByIdAndUpdate(data._id, { ...data }, { new: true, session: optSession }).exec()
    } catch (err) {
        throw err
    }
}

const getCoffeeById = async (id, optSession) => {
    try {
        return await Coffee.findById(id).session(optSession).exec()
    } catch (err) {
        throw err
    }
}

const _getCoffeeQuery = (updateOptions) => {
    const defaultOptions = {
        sort: {
            name: 'asc',
        },
        limit: 20,
        page: 1
    }
    const options = { ...defaultOptions, ...updateOptions }
    let filter = {}
    if (options.roastLevel && options.roastLevel.length > 0) {
        filter = { ...filter, roastLevel: { $in: options.roastLevel } }
    }
    if (options.menus && options.menus.length > 0) {
        filter = { ...filter, menus: { $in: options.menus } }
    }
    if (options.smell && options.smell.length > 0) {
        filter = { ...filter, smell: { $in: options.smell } }
    }
    if (options.process && options.process.length > 0) {
        filter = { ...filter, process: { $in: options.process } }
    }
    if (options.makes && options.makes.length > 0) {
        filter = { ...filter, makes: { $in: options.makes } }
    }
    if (options.species && options.species.length > 0) {
        filter = { ...filter, species: { $in: options.species } }
    }
    return Coffee.find(filter)
            .limit(options.limit)
            .skip((options.page - 1) * options.limit)
            .sort(options.sort)

}

const getCoffee = async (updateOptions) => {
    try {
        return await _getCoffeeQuery(updateOptions).select('-vote').exec()
    } catch (err) {
        throw err
    }
}

const getCoffeeWithVote = async (updateOptions) => {
    try {
        return await _getCoffeeQuery(updateOptions).exec()
    } catch (err) {
        throw err
    }
}


const deleteCoffee = async (id) => {
    try {
        await Coffee.findByIdAndDelete(id)
    } catch (err) {
        throw err
    }
}

module.exports = {
    createCoffee,
    updateCoffee,
    getCoffeeById,
    getCoffee,
    getCoffeeWithVote,
    deleteCoffee,
}