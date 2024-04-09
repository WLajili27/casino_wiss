module.exports = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        status: 'error',
        statusCode,
        message: err.message
    });
};
