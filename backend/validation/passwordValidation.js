const bcrypt = require('bcrypt')

async function comparePasswords(pass1, pass2) {
    try {
        if (! await bcrypt.compare(pass1, pass2))
            throw { "message": "Password is wrong", "status": 401, "code": "WRONG_PASS" }
    } catch (err) {
        throw err
    }
}

async function hashedPassword(password) {
    try {
        return await bcrypt.hash(password, 10)
    } catch (err) {
        throw err
    }

}

module.exports = {
    comparePasswords,
    hashedPassword
}
