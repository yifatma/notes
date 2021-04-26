const Todos=require('../models/todoModel')

async function getByName(username) {
    return await Todos.find({ 'username': username })
}

async function getById(id) {

    return await Todos.findById(id)
}

async function findByIdAndUpdate(req) {
    const todo={}
    if (req.body.username) { todo['todo']=req.body.username }
    if (req.body.todo) { todo['todo']=req.body.todo }
    if (req.body.isDone) { todo['isDone']=req.body.isDone }
    if (req.body.hasAttachment) { todo['hasAttachment']=req.body.hasAttachment }

    const id=req.body.id? req.body.id:req.body._id['$oid']
    return await Todos.findByIdAndUpdate(id, todo)
}

function initObject(obj) {
    return {
        username: obj.username,
        todo: obj.todo,
        isDone: obj.isDone,
        hasAttachment: obj.hasAttachment
    }
}

async function create(obj) {
    return await Todos.create(obj)
}

async function findByIdAndRemove(id) {
    return await Todos.findByIdAndRemove(id)
}

module.exports={
    getById,
    getByName,
    findByIdAndUpdate,
    initObject,
    create,
    findByIdAndRemove
}

