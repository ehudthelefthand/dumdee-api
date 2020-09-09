const Coffee = require('../model/coffee')

const createCoffee = async (data) => {
    try {
        return await Coffee.create(data)
    } catch (err) {
        throw err
    }
}

const updateCoffee = async (data) => {
    try {
        return await Coffee.findByIdAndUpdate(data._id, { ...data }, { new: true })
    } catch (err) {
        throw err
    }
}

const getCoffeeById = async (id) => {
    try {
        return await Coffee.findById(id).exec()
    } catch (err) {
        throw err
    }
}

const getCoffee = async (updateOptions) => {
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
    try {
        return await Coffee.find(filter)
            .limit(options.limit)
            .skip((options.page - 1) * options.limit)
            .sort(options.sort)
            .exec()
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
    deleteCoffee,
}