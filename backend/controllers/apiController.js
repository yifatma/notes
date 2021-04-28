const dbFactory = require('../db/dbFactory')

const dbUtils = dbFactory.getDBUtils()
const todoUtils = dbUtils.getTodoUtils()

module.exports = function (app) {

    app.get('/api/todos/:uname', async function (req, res) {
        const todos = await todoUtils.getByName(req.params.uname)

        res.send(todos)
    })

    app.get('/api/todo/:id', async function (req, res) {
        const todo = await todoUtils.getById(req.params.id)

        res.send(todo)
    })

    app.post('/api/todo', async function (req, res) {

        if (req.body.id || req.body._id['$oid']) {
            const todo = await todoUtils.findByIdAndUpdate(req)
            res.send(`Success findByIdAndUpdate result [${todo}]`)
        }
        else {

            const newTodo = todoUtils.initObject(req.body)

            const todos = await todoUtils.create(newTodo)
            res.send(`Success findByIdAndUpdate result [${todos}]`)
        }
    })

    app.delete('/api/todo', async function (req, res) {
        var id = req.body.id ? req.body.id : req.body._id['$oid']

        const todo = await todoUtils.findByIdAndRemove(id)
        res.send(todo)
    })
}

