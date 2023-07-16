const errorResponse = require('../utils/errorResponse')

const errorHandle = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    if (err.name === "SequelizeValidationError") {
        const message = Object.values(err.errors).map((val) => { return val.message })
        error = new errorResponse(message, 404)
    } else {
        error = new errorResponse(error.message, 404)


    }
    res.status(error.statusCode).json({ success: false, error: error.message })
}

module.exports = errorHandle