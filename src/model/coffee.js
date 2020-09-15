const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    beanSampleImage: {
        type: String,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    },
    price: {
        type: Number,
    },
    priceUnit: {
        type: String,
        default: 'THB',
    },
    weight: {
        type: Number,
    },
    netWeight: {
        type: Number,
    },
    weightUnit: {
        type: String,
        default: 'GM',
    },
    species: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'species',
    },
    roastLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roastLevel',
    },
    roastDate: {
        type: Date,
    },
    bestPeriod: {
        type: String,
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    },
    process: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'process'
    },
    makes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'make'
        }],
    },
    menus: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'menu'
        }],
    },
    smell: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'smell'
    },
    vote: Number
});

module.exports = mongoose.model('coffee', coffeeSchema)
