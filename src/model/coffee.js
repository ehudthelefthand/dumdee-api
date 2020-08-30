const mongoose = require('mongoose')

const beerSchema = new mongoose.Schema({
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
    reviews: [String]
});

module.exports = mongoose.model('coffee', beerSchema)