const Notes = require('../models/noteModel')

async function getObj(obj) {

    try {
        return await Notes.find(obj)
    } catch (e) {
        console.log(`Error: ${e}`)
    }

}

async function getById(id) {

    return await Notes.findById(id)
}

async function findByIdAndUpdate(req, obj) {
    const note = {}
    req.body.userId ? note['userId'] = req.body.userId : note['userId'] = obj.userId
    req.body.header ? note['header'] = req.body.header : note['header'] = obj.header

    return await Notes.findByIdAndUpdate(req.body.id, note)
}


function initObject(obj) {
    return {
        userId: obj.userId,
        header: obj.header
    }
}

async function create(obj) {
    return await Notes.create(obj)
}

async function findByIdAndRemove(id) {
    return await Notes.findByIdAndRemove(id)
}

module.exports = {
    getById,
    getObj,
    findByIdAndUpdate,
    initObject,
    create,
    findByIdAndRemove
}

