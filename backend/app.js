const express=require('express')
const DBFactory=require('./db/dbFactory')
const setupController=require('./controllers/setupController')
const apiController=require('./controllers/apiController')
const app=express()

const port=process.env.PORT||3000

app.use('/assets', express.static(__dirname+'/public'))

app.set('view engine', 'ejs')

const createDBConnection=new Promise(async (resolve, reject) => {

    const dbUtils=DBFactory.getDBUtils()
    await dbUtils.createDBConnection()
    resolve()
})

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

setupController(app)
apiController(app)

createDBConnection.then(() => {
    console.log(`Server is listen on port ${port}`)
    app.listen(port)
})
