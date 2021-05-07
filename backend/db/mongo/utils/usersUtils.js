const Users = require('../models/userModel')

//Good
async function getObj(obj) {

    const user = await Users.find(obj)
    if (user.length == 0)
        throw { "message": `User ${JSON.stringify(obj)} does not exist`, "status": 404, "code": "USER_NOT_EXIST" }

    return user
}

//Good
async function getById(id) {

    const obj = await Users.findById(id)
    if (obj.length == 0)
        throw { "message": `User ID ${id} not exist`, "status": 404, "code": "USER_NOT_EXIST" }
    return obj
}

//To Check error case
async function findByIdAndUpdate(id, obj) {

    try {
        return await Users.findByIdAndUpdate(id, obj)
    } catch (err) {
        const error = _.chain(err)
            .pick(['message'])
            .set('status', 404)
            .set('code', 'USER_NOT_EXIST')
            .value()
        throw error
    }
}


// async function findByIdAndUpdate(req, obj, hashedPassword) {
//     const user = {}
//     req.body.email ? user['email'] = req.body.email : user['email'] = obj.email
//     req.body.firstName ? user['firstName'] = req.body.firstName : user['firstName'] = obj.firstName
//     req.body.lastName ? user['lastName'] = req.body.lastName : user['lastName'] = obj.lastName
//     hashedPassword ? user['password'] = hashedPassword : user['password'] = obj.password

//     return await Users.findByIdAndUpdate(req.body.id, user)
// }

function initObject(obj, hashedPassword) {
    return {
        email: obj.email,
        firstName: obj.firstName,
        lastName: obj.lastName,
        password: hashedPassword
    }
}

async function create(obj) {
    return await Users.create(obj)
}

async function findByIdAndRemove(id) {
    return await Users.findByIdAndRemove(id)
}

module.exports = {
    getById,
    getObj,
    findByIdAndUpdate,
    initObject,
    create,
    findByIdAndRemove
}

