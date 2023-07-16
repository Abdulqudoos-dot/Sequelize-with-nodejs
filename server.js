const express = require("express")
const colors = require('colors')
const errorHandle = require("./middleware/errorHandle")

// connecting database 
require('./model')
// const User = require('./model/User')
// const Contact = require('./model/Contact')

const port = 3000


const app = express()


app.use(express.json())
app.use('/api/v1/users', require('./routs/users'))
app.use('/api/v1/sequelizeMethods', require('./routs/sequelizeMethods'))
app.use(errorHandle)

app.get('/', (req, res) => {
    res.send('hello world')
})

// delete existing table and make new

// creating tables ob by one 
// we will not do this here for every table we will this do in index.js of model to work smartly}

// User.sync({ force: true })
// Contact .sync({ force: true })


// only  make new
// User.sync()

// if any changes occure then it will save changes otherwise do nothing
// User.sync({ alter: true })


const server = app.listen(port, () => {
    console.log(`the app is listening on http://localhost:${port}`.green.bold)
})

// this is for error handling to sho error in console
process.on('unhandledRejection', (error) => {
    console.log(`Error: ${error.message}`.bgRed)
    server.close(() => {
        process.exit(1)
    })
})