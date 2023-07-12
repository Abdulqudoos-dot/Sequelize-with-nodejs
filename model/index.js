const { Sequelize, DataTypes } = require('sequelize')

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('employeeDb', 'root', 'A03062404012z///+++///', {
    host: 'localhost',
    dialect: 'mysql',
});

try {
    sequelize.authenticate()
    console.log("Connection has been established successfully".bgBlue)
} catch (error) {
    console.log("Unable to connect to datbase", error)
}
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.User = require('./User')(sequelize, DataTypes)
db.Contact = require('./Contact')(sequelize, DataTypes)

db.sequelize.sync({
    force: true
})


module.exports = db
