const { db } = require("./src/model/user")

db.createUser({
    user: "devuser",
    pwd: "P@ssw0rd",
    roles: [{
        role: "readWrite",
        db: "dumdee"
    }]
})
