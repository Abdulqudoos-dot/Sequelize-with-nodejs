
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: 'Babar Ali'
        }
    }, {
        tableName: 'users'
    })

    console.log(`user model : ${User === sequelize.models.User}`.bgYellow)
}