const express = require("express")
const colors = require('colors')
// connecting database 
require('./model')
// const User = require('./model/User')
// const Contact = require('./model/Contact')

const port = 3000


const app = express()


app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})
// delete existing table and make new

// creating tables ob by one 
// User.sync({ force: true })
// Contact .sync({ force: true })


// only  make new
// User.sync()

// if any changes occure then it will save changes otherwise do nothing
// User.sync({ alter: true })


const server = app.listen(port, () => {
    console.log(`the app is listening on http://localhost:${port}`.green.bold)
})


process.on('unhandledRejection', (error) => {
    console.log(`Error: ${error.message}`.bgRed)
    server.close(() => {
        process.exit(1)
    })
})