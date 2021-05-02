const Items = require('../models/itemModel')

async function getObj(obj) {

    try {
        return await Items.find(obj)
    } catch (e) {
        console.log(`Error: ${e}`)
    }

}

async function getById(id) {

    return await Items.findById(id)
}

async function findByIdAndUpdate(req, obj) {
    const note = {}
    req.body.item ? note['item'] = req.body.item : note['item'] = obj.item
    req.body.isDone ? note['isDone'] = req.body.isDone : note['isDone'] = obj.isDone
    req.body.hasAttachment ? note['hasAttachment'] = req.body.hasAttachment : note['hasAttachment'] = obj.hasAttachment

    return await Items.findByIdAndUpdate(req.body.id, note)
}

function initObject(obj) {
    return {
        noteId: obj.noteId,
        item: obj.item,
        isDone: obj.isDone,
        hasAttachment: obj.hasAttachment
    }
}

async function create(obj) {
    return await Items.create(obj)
}

async function findByIdAndRemove(id) {
    return await Items.findByIdAndRemove(id)
}

module.exports = {
    getById,
    getObj,
    findByIdAndUpdate,
    initObject,
    create,
    findByIdAndRemove
}
