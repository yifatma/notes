const _ = require('lodash')
const dbFactory = require('../db/dbFactory')

const dbUtils = dbFactory.getDBUtils()
const noteUtils = dbUtils.getNoteUtils()

module.exports = function (app) {

    app.get('/api/notes', async function (req, res) {
        const obj = {}

        if (req.query.userId) obj['userId'] = req.query.userId

        if (!_.isEmpty(obj)) {
            const notes = await noteUtils.getObj(obj)
            res.send(notes)
        }
        else {
            res.send('URL /api/notes?userId=user ID number')
        }
    })

    app.get('/api/notes/:id', async function (req, res) {
        const note = await noteUtils.getById(req.params.id)

        res.send(note)
    })

    app.post('/api/notes', async function (req, res) {

        if (req.body.id) {
            const obj = await noteUtils.getById(req.body.id)

            if (obj) {
                const note = await noteUtils.findByIdAndUpdate(req, obj)
                res.send(`Success findByIdAndUpdate result [${note}]`)
                return
            }

        }

        const newnote = noteUtils.initObject(req.body)

        try {
            const notes = await noteUtils.create(newnote)
            res.send(`Success findByIdAndUpdate result [${notes}]`)
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

    app.delete('/api/notes', async function (req, res) {
        var id = req.body.id

        const todo = await noteUtils.findByIdAndRemove(id)
        res.send(todo)
    })
}

