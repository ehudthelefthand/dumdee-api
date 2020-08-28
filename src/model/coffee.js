const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
    name: {
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
    brand: {
        type: String,
        required: true
    },
    weight: Number,
    netWeight: Number,
    awards: [{
        name: String,
        date: Date
    }],
    location: [],
    roastLevel: String,
    roastDate: Date,
    reviews: []
});

module.exports = mongoose.model('coffee', coffeeSchema)
