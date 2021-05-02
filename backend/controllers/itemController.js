const _ = require('lodash')
const dbFactory = require('../db/dbFactory')

const dbUtils = dbFactory.getDBUtils()
const itemUtils = dbUtils.getItemUtils()

module.exports = function (app) {

    app.get('/api/items', async function (req, res) {
        const obj = {}

        if (req.query.noteId) obj['noteId'] = req.query.noteId

        if (!_.isEmpty(obj)) {
            const items = await itemUtils.getObj(obj)
            res.send(items)
        }
        else {
            res.send('URL /api/items?noteId=note ID number')
        }
    })

    app.get('/api/item/:id', async function (req, res) {
        const item = await itemUtils.getById(req.params.id)

        res.send(item)
    })

    app.post('/api/item', async function (req, res) {

        if (req.body.id) {
            const obj = await itemUtils.getById(req.body.id)

            if (obj) {
                const item = await itemUtils.findByIdAndUpdate(req, obj)
                res.send(`Success findByIdAndUpdate result [${item}]`)
                return
            }

        }

        const newItem = itemUtils.initObject(req.body)

        try {
            const item = await itemUtils.create(newItem)
            res.send(`Success findByIdAndUpdate result [${item}]`)
        } catch (err) {

            if (err && err.code === 11000) {
                res.send(`Email already exist`)
                return
            } else {
                res.send(`Error: ${err}`)
                throw err
            }

        }
    })

    app.delete('/api/item', async function (req, res) {
        var id = req.body.id

        const todo = await itemUtils.findByIdAndRemove(id)
        res.send(todo)
    })
}

