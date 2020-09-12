const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const setUser = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return next()
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        return next()
    } catch (err) {
        return res.sendStatus(401)
    }
}

const requireUser = (req, res, next) => {
    if (req.user) {
        return next()
    }
    return res.sendStatus(401)
}

const requireAdmin = (req, res, next) => {
    // This is just an illustrate
    // Don't use in real production
    if (req.user && req.user.email === 'admin@email.com') {
        return next()
    }
    return res.sendStatus(401)
}

module.exports = {
    setUser,
    requireUser,
    requireAdmin,
}