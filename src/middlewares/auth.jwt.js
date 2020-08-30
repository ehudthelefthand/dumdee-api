const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ message: "No token !"});
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next()
        return
    } catch (err) {
        return res.sendStatus(401)
    }
}

module.exports = {
    verifyToken
}