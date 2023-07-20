module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('player', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        tableName: 'players'
    })
    return Player
    // console.log(`Player model : ${Player === sequelize.models.Player}`.bgYellow)
}