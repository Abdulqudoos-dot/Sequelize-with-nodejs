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
// db.Player = require('./Player')(sequelize, DataTypes)

// db.UserContact = require('./UserContact')(sequelize, DataTypes, db.User, db.Contact)
// db.PlayerUserContact = require('./PlayerUserContact')(sequelize, DataTypes, db.Player, db.UserContact)



// assocciate one user to one contact
// db.User.hasOne(db.Contact); // db.Contact HasOne db.Contact
// db.Contact.belongsTo(db.User); // db.Contact BelongsTo db.Contact





// // associate one user t many contacts
db.User.hasMany(db.Contact); // db.User HasMany db.Contact
db.contactUser = db.Contact.belongsTo(db.User, { as: 'user' }); // db.Contact BelongsTo db.Contact









// associate many user to many contacts

// this is many to many 
// db.User.belongsToMany(db.Contact, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact
// db.Contact.belongsToMany(db.User, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact










// this is super many to many assocciation

// this is also many to many assocciation
// db.User.hasMany(db.UserContact); // db.Contact HasMany db.Contact
// db.UserContact.belongsTo(db.User); // db.
// db.Contact.hasMany(db.UserContact); // db.Contact HasMany db.Contact
// db.UserContact.belongsTo(db.Contact);


// db.User.belongsToMany(db.Contact, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact
// db.Contact.belongsToMany(db.User, { through: db.UserContact }); // db.Contact belongsToMany with db.Contact

// db.User.hasMany(db.UserContact); // db.Contact HasMany db.Contact
// db.UserContact.belongsTo(db.User); // db.
// db.Contact.hasMany(db.UserContact); // db.Contact HasMany db.Contact
// db.UserContact.belongsTo(db.Contact);






// this is  many to many to many assocciations

// db.User.belongsToMany(db.Contact, { through: db.UserContact }); // db.User belongsToMany with db.Contact
// db.Contact.belongsToMany(db.User, { through: db.UserContact }); // db.Contact belongsToMany with db.User
// db.User.hasMany(db.UserContact); // db.User HasMany db.UserContact
// db.UserContact.belongsTo(db.User); // db.UserContact  belongsTo db.UserContact
// db.Contact.hasMany(db.UserContact); // db.Contact HasMany db.UserContact
// db.UserContact.belongsTo(db.Contact);// db.UserContact belongsTo db.Contact

// db.Player.belongsToMany(db.UserContact, { through: db.PlayerUserContact }); // db.Player belongsToMany with db.PlayerUserContact
// db.UserContact.belongsToMany(db.Player, { through: db.PlayerUserContact }); // db.UserContact belongsToMany with db.PlayerUserContact

// db.Player.hasMany(db.PlayerUserContact); // db.Player HasMany db.Contact
// db.PlayerUserContact.belongsTo(db.Player); // db.PlayerUserContact belongs to db.Player
// db.UserContact.hasMany(db.PlayerUserContact); // db.UserContact HasMany db.PlayerUserContact
// db.PlayerUserContact.belongsTo(db.UserContact);//PlayerUserContact belongsTo UserContact



db.sequelize.sync({
    force: false
})


module.exports = db
