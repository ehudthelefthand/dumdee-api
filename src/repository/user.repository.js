const User = require('../model/user');

const createUser = (email, hashedPassword) => {
    const user = new User({
        email: email,
        password: hashedPassword
    });
    return user.save()
}

const getByEmail = (email) => {
    return User.findOne({
        email: email
    })
}


module.exports = {
    createUser,
    getByEmail
}