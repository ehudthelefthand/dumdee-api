const pino = require('pino')
const path = "./log/application.log"
const logger = pino({ level: process.env.LOG_LEVEL || 'info' }, path)


module.exports = {
    logger
}