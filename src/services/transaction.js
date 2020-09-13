
const mongoose = require('mongoose')

const withTransaction = async (cb) => {
    try {
        const session = await mongoose.startSession()
        await cb(session)
        await session.endSession()
    } catch (err) {
        console.error(err)
        await session.endSession()
        throw err
    }

}
module.exports = withTransaction