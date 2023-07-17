const db = require('../model')


module.exports = (sequelize, DataTypes, User, Contact) => {
    const UserContact = sequelize.define('UserContact', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        contactId: {
            type: DataTypes.INTEGER,
            references: {
                model: Contact,
                key: 'id'
            }
        },

    }, {
        timestamps: false,
        tableName: 'usercontacts'
    })


    return UserContact
    console.log(`UserContact model : ${UserContact === sequelize.models.UserContact}`.bgYellow)
}