const Users = require('../models/userModel')

async function getObj(obj) {

    try {
        return await Users.find(obj)
    } catch (e) {
        console.log(`Error: ${e}`)
    }

}

async function getById(id) {

    return await Users.findById(id)
}

async function findByIdAndUpdate(req, obj) {
    const user = {}
    req.body.email ? user['email'] = req.body.email : user['email'] = obj.email
    req.body.firstName ? user['firstName'] = req.body.firstName : user['firstName'] = obj.firstName
    req.body.lastName ? user['lastName'] = req.body.lastName : user['lastName'] = obj.lastName
    req.body.password ? user['password'] = req.body.password : user['password'] = obj.password

    return await Users.findByIdAndUpdate(req.body.id, user)
}

function initObject(obj) {
    return {
        email: obj.email,
        firstName: obj.firstName,
        lastName: obj.lastName,
        password: obj.password
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

