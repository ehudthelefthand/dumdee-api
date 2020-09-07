const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    beanSampleImage: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        default: 'THB',
    },
    weight: {
        type: Number,
        required: true
    },
    netWeight: {
        type: Number,
        required: true
    },
    weightUnit: {
        type: String,
        default: 'GM',
    },
    species: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'species',
        required: true,
    },
    roastLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roastLevel',
        required: true,
    },
    roastDate: {
        type: Date,
        required: true,
    },
    bestPeriod: {
        type: String,
        required: true,
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
    }
});

module.exports = mongoose.model('coffee', coffeeSchema)
