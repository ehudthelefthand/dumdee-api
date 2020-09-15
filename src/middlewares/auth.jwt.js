const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const setUser = (req, res, next) => {
    next()
}

const requireUser = (req, res, next) => {
    next()
}

const requireAdmin = (req, res, next) => {
    next()
}

module.exports = {
    setUser,
    requireUser,
    requireAdmin,
}