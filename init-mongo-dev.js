db.createUser({
    user: "devuser",
    pwd: "P@ssw0rd",
    roles: [{
        role: "readWrite",
        db: "dumdee"
    }]
})