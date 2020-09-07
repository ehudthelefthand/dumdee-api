require('dotenv').config({ path: './.test.integration.env' })
const { connect, disconnect } = require('./src/database')

beforeAll(async () => {
    try {
        await connect()
    } catch (err) {
        throw err
    }
})

afterAll(async () => {
    try {
        await disconnect()
    } catch (err) {
        throw err
    }
})
