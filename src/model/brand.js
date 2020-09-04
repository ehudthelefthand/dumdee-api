const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shopAddress: String,
    factoryAddress: String,
})

module.exports = mongoose.model('brand', brandSchema);
