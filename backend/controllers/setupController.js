const DBFactory = require('../db/dbFactory')

module.exports = function (app) {
    app.get('/api/setupTodos', async function (req, res) {

        //seed datbase
        const dbUtils = DBFactory.getDBUtils()
        const result = await dbUtils.insertSeedData()
        res.send(result)
    })


}