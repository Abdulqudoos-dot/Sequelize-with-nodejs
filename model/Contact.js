module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contact', {
        // name: DataTypes.STRING
        permanentAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentAddress: {
            type: DataTypes.STRING,
            defaultValue: 'Faisalabad'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'contacts'
    })
    return Contact
    // console.log(`contact model : ${Contact === sequelize.models.Contact}`.bgYellow)
}