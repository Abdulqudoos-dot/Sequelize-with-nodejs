
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'users'
    })


    return User
    console.log(`user model : ${User === sequelize.models.User}`.bgYellow)
}