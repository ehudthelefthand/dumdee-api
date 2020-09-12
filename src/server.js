
const PORT = process.env.PORT || 3000;
const app = require('./express');
const user = require('./routes/user.routes');

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

