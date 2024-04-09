const logger = require('./logger'); // since there is not much to log so i decided to go with morgan instead of winston

module.exports = (req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
};
