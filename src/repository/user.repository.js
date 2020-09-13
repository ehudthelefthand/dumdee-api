const User = require('../model/user');

const createUser = (email, hashedPassword) => {
    const user = new User({
        email: email,
        password: hashedPassword
    });
    return user.save()
}

const getByEmail = (email, optSession) => {
    return User.findOne({
        email: email
    }, { session: optSession })
}


module.exports = {
    createUser,
    getByEmail
}