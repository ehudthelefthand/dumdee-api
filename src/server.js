const express = require('express');
const expressPino = require('express-pino-logger');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger/logger').logger;
const expressLogger = expressPino({ logger });

const user = require('./rotues/user.routes');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(expressLogger);

app.use(cors());
app.use(bodyParser.json())


app.use(user());

require('./database')
    .connect()
    .then(() => {
        logger.info("Successfully connect to database.");
        app.listen(PORT, () => {
            console.log('Server running on port %d', PORT);
            logger.info('Server running on port %d', PORT);
        });
    })
    .catch((err) => logger.error("Connection error: ", err));

