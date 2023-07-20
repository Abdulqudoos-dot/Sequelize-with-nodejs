module.exports = (sequelize, DataTypes, Player, UserContact) => {
    const PlayerUserContact = sequelize.define('playerusercontact', {
        playerId: {
            type: DataTypes.INTEGER,
            references: {
                model: Player,
                key: 'id'
            }
        },
        usercontactId: {
            type: DataTypes.INTEGER,
            references: {
                model: UserContact,
                key: 'id'
            }
        },
    }, {
        tableName: 'playerusercontacts'
    })
    return PlayerUserContact
    // console.log(`PlayerUserContact model : ${PlayerUserContact === sequelize.models.PlayerUserContact}`.bgYellow)
}