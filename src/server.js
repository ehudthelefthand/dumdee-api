const express = require('express');
const expressPino = require('express-pino-logger');
const logger = require("./logger/logger").logger;
const expressLogger = expressPino({ logger });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(expressLogger);

app.get('/', (req, res) => {
    logger.info('Calling res.send');
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log('Server running on port %d', PORT);
    logger.info('Server running on port %d', PORT);
});
