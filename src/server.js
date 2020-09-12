
const PORT = process.env.PORT || 3000;
const logger = require('./logger/logger').logger;
const app = require('./express');
const user = require('./routes/user.routes');
const coffee = require('./routes/coffee.routes')
const vote = require('./routes/vote.routes')

app.use(user());
app.use(coffee())
app.use(vote())

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

