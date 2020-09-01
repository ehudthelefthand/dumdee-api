const mongoose = require('mongoose')

const connect = () => {
    let config = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    if (process.env.DB_USER) {
        config = {
            ...config,
            user: process.env.DB_USER,
            pass: process.env.DB_PWD,
        }
    }
    return mongoose.connect(process.env.DB_URL, config)
}

const disconnect = () => {
    return mongoose.disconnect()
}

const clearDB = async () => {
    try {
        for (let i in mongoose.connection.collections) {
            await mongoose.connection.collections[i].deleteMany()
        }
    } catch (err) {
        throw err
    }
}

module.exports = {
    connect, disconnect, clearDB
}