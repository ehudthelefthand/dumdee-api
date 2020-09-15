const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    shopAddress: String,
    factoryAddress: String,
    awards: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'award'
        }]
    }
})

module.exports = mongoose.model('brand', brandSchema);
