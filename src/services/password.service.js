const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET


function hash(str) {
    return bcrypt.hashSync(str, 8)
}

function compare(plainStr, hashedStr) {
    return bcrypt.compareSync(plainStr, hashedStr)
}

function generateToken(payload) {
    return jwt.sign(payload, SECRET, {
        expiresIn: 86400
    })
}

module.exports = {
    hash,
    compare,
    generateToken
}