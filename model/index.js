const { Sequelize, DataTypes } = require('sequelize')

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('employeeDb', 'root', 'A03062404012z///+++///', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
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
db.UserContact = require('./UserContact')(sequelize, DataTypes, db.User, db.Contact)


// assocciate one user to one contact
// db.User.hasOne(db.Contact); // db.Contact HasOne db.Contact
// db.Contact.belongsTo(db.User); // db.Contact BelongsTo db.Contact

// // associate one user t many contacts
// db.User.hasMany(db.Contact); // db.Contact HasMany db.Contact
// db.contactUser = db.Contact.belongsTo(db.User, { as: 'user' }); // db.Contact BelongsTo db.Contact

// associate many user to many contacts
// this is many to many 
// db.User.belongsToMany(db.Contact, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact
// db.Contact.belongsToMany(db.User, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact


// this is also many to many assocciation
// db.User.hasMany(db.UserContact); // db.Contact HasMany db.Contact
// db.UserContact.belongsTo(db.User); // db.
// db.Contact.hasMany(db.UserContact); // db.Contact HasMany db.Contact
// db.UserContact.belongsTo(db.Contact);


// this is super many to many assocciation

db.User.belongsToMany(db.Contact, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact
db.Contact.belongsToMany(db.User, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact

db.User.hasMany(db.UserContact); // db.Contact HasMany db.Contact
db.UserContact.belongsTo(db.User); // db.
db.Contact.hasMany(db.UserContact); // db.Contact HasMany db.Contact
db.UserContact.belongsTo(db.Contact);

db.sequelize.sync({
    force: false
})


module.exports = db
