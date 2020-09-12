const express = require('express')

const expressPino = require('express-pino-logger');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger/logger').logger;
const expressLogger = expressPino({ logger });
const AuthJwt = require('./middlewares/auth.jwt')

const app = express();

app.use(expressLogger);
app.use(cors());
app.use(bodyParser.json())
app.use(AuthJwt.setUser)

module.exports = app